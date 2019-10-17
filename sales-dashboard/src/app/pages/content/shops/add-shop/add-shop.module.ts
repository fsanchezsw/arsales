import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddShopComponent } from './add-shop.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [AddShopComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule
  ]
})
export class AddShopModule { }
