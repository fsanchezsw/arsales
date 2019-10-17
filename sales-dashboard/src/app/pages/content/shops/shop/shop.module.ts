import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';
import { CustomDialogComponent } from 'src/app/features/custom-dialog/custom-dialog.component';

@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  entryComponents: [CustomDialogComponent]
})
export class ShopModule { }
