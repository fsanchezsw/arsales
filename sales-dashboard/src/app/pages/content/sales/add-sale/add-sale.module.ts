import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSaleComponent } from './add-sale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatSelectModule, MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [AddSaleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule
  ]
})
export class AddSaleModule { }
