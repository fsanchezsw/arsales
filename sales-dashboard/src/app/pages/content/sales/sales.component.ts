import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/models/sale.model';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/services/toolbar.service';
import { SaleProvider } from 'src/providers/sale.provider';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  // sales: Sale[] = [
  //   { id: 1, name: 'Pantalón largo de pana', price: 24.99, discount: 15, shop: { name: 'Bershka' } },
  //   { id: 2, name: 'Jersey de lino moteado', price: 49.99, discount: 25, shop: { name: 'Cortefiel' } },
  //   { id: 3, name: 'Camiseta hawaiana', price: 9.99, discount: 50, shop: { name: 'Springfield' } }
  // ];

  sales: Sale[] = [];
  
  displayedColumns = ['name', 'price', 'discount', 'shop'];
  dataSource: MatTableDataSource<Sale> = new MatTableDataSource<Sale>();

  constructor(
    private toolbarService: ToolbarService,
    private saleProvider: SaleProvider,
    private router: Router
  ) { }

  ngOnInit() {
    this.toolbarService.setOptions({ title: 'Ofertas' });

    this.saleProvider.all({ include: 'shop' }).subscribe(sales => this.dataSource.data = sales);
  }

  onAdd() { this.router.navigate(['/sales/add']); }

  onEdit(sale: Sale) { this.router.navigate([`/sales/${sale.id}`]); }
}
