import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDialogComponent } from './custom-dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [CustomDialogComponent],
  imports: [
    CommonModule,

    MatDialogModule,
    MatButtonModule
  ]
})
export class CustomDialogModule { }
