import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { MatListModule, MatIconModule, MatSidenavModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,

    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
