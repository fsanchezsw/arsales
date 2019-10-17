import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/models/sale.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToolbarService } from 'src/services/toolbar.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomDialogComponent } from 'src/app/features/custom-dialog/custom-dialog.component';
import { SaleProvider } from 'src/providers/sale.provider';
import { PersonProvider } from 'src/providers/person.provider';
import { Shop } from 'src/models/shop.model';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  shops: Shop[] = [];
  sale: Sale;
  form: FormGroup;

  constructor(
    private toolbarService: ToolbarService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private personProvider: PersonProvider,
    private saleProvider: SaleProvider,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      name: [, Validators.required],
      price: [, Validators.required],
      discount: [, Validators.required],
      url: [, Validators.required],
      idShop: [, Validators.required]
    });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;

    this.personProvider.allShops().subscribe(shops => this.shops = shops)

    this.saleProvider.get(id).subscribe(sale => {
      this.sale = sale;

      this.toolbarService.setOptions({ title: `Ofertas / ${sale.name}` });
      this.setFormValues(sale);
    });
  }

  private setFormValues(sale: Sale) {
    this.form.setValue({
      name: sale.name,
      price: sale.price,
      discount: sale.discount,
      url: sale.url,
      idShop: sale.idShop
    });
  }

  onSubmit() {
    const sale: Sale = { ...this.form.value };

    this.saleProvider.put(this.sale.id, sale).subscribe(() => {
      this.snackBar.open(
        `Oferta modificada correctamente`,
        'Vale',
        { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' }
      );
      this.router.navigate([`/sales`], { replaceUrl: true });
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
        subtitle: '¿Estás seguro de querer borrar esta oferta?',
      }
    });

    dialogRef.afterClosed().subscribe((response: string) => {
      if(response.toLowerCase() === 'accept') {
        this.saleProvider.delete(this.sale.id).subscribe(() => {
          this.snackBar.open(
            `Oferta eliminada correctamente`,
            'Vale',
            { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' }
          );
          this.router.navigate([`/sales`], { replaceUrl: true });
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
