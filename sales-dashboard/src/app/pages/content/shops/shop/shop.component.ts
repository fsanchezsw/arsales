import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/models/shop.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToolbarService } from 'src/services/toolbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CustomDialogComponent } from 'src/app/features/custom-dialog/custom-dialog.component';
import { PersonProvider } from 'src/providers/person.provider';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  shop: Shop;
  form: FormGroup;

  constructor(
    private toolbarService: ToolbarService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private personProvider: PersonProvider,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      name: [, Validators.required],
      latitude: [, [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: [, [Validators.required, Validators.min(-180), Validators.max(180)]]
    });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;

    this.personProvider.getShop(id).subscribe(shop => {
      this.shop = shop;

      this.toolbarService.setOptions({ title: `Ofertas / ${shop.name}` });
      this.setFormValues(shop);
    });
  }

  private setFormValues(shop: Shop) {
    this.form.setValue({
      name: shop.name,
      latitude: shop.latitude,
      longitude: shop.longitude
    });
  }

  onSubmit() {
    const shop: Shop = { ...this.form.value };

    this.personProvider.putShop(this.shop.id, shop).subscribe(() => {
      this.snackBar.open(
        `Tienda modificada correctamente`,
        'Vale',
        { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' }
      );
      this.router.navigate([`/shops`], { replaceUrl: true });
    }, err => {
      this.snackBar.open(
        'Ha ocurrido un error, vuelve a intentarlo más tarde',
        'Vale',
        { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' }
      );
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '500px',
      autoFocus: false,
      data: {
        title: '¡CUIDADO!',
        subtitle: '¿Estás seguro de querer borrar esta tienda?',
      }
    });

    dialogRef.afterClosed().subscribe((response: string) => {
      if(response.toLowerCase() === 'accept') {
        this.personProvider.deleteShop(this.shop.id).subscribe(() => {
          this.snackBar.open(
            `Tienda eliminada correctamente`,
            'Vale',
            { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' }
          );
          this.router.navigate([`/shops`], { replaceUrl: true });
        }, err => {
          this.snackBar.open(
            'Ha ocurrido un error, vuelve a intentarlo más tarde',
            'Vale',
            { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' }
          );
        });
      }
    });
  }
}
