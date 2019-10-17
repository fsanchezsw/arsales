import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Shop } from 'src/models/shop.model';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/services/toolbar.service';
import { PersonProvider } from 'src/providers/person.provider';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  displayedColumns = ['name', 'latitude', 'longitude'];
  dataSource: MatTableDataSource<Shop> = new MatTableDataSource<Shop>();

  constructor(
    private toolbarService: ToolbarService,
    private personProvider: PersonProvider,
    private router: Router
  ) { }

  ngOnInit() {
    this.toolbarService.setOptions({ title: 'Tiendas' });

    this.personProvider.allShops().subscribe(shops => this.dataSource.data = shops);
  }

  onAdd() { this.router.navigate(['/shops/add']); }

  onEdit(shop: Shop) { this.router.navigate([`/shops/${shop.id}`]); }
}
