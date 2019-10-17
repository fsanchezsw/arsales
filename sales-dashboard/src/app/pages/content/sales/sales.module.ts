import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales.component';
import { MatProgressSpinnerModule, MatTableModule, MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule,

    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class SalesModule { }
