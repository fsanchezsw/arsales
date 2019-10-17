import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopsComponent } from './shops.component';
import { MatTableModule, MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [ShopsComponent],
  imports: [
    CommonModule,

    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class ShopsModule { }
