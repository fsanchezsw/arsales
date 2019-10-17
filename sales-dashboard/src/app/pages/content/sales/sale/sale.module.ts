import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleComponent } from './sale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';
import { CustomDialogComponent } from 'src/app/features/custom-dialog/custom-dialog.component';

@NgModule({
  declarations: [SaleComponent],
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
  ],
  entryComponents: [CustomDialogComponent]
})
export class SaleModule { }
