import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarModule } from './core/navbar/navbar.module';
import { MatSidenavModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { ShopsModule } from './pages/content/shops/shops.module';
import { SalesModule } from './pages/content/sales/sales.module';
import { AddShopModule } from './pages/content/shops/add-shop/add-shop.module';
import { ShopModule } from './pages/content/shops/shop/shop.module';
import { AddSaleModule } from './pages/content/sales/add-sale/add-sale.module';
import { SaleModule } from './pages/content/sales/sale/sale.module';
import { LoginModule } from './pages/auth/login/login.module';
import { CustomDialogModule } from './features/custom-dialog/custom-dialog.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatSidenavModule,
    
    // core modules
    NavbarModule,

    // feature modules
    CustomDialogModule,

    // auth modules
    LoginModule,
    
    // shop modules
    ShopsModule,
    AddShopModule,
    ShopModule,

    // sale modules
    SalesModule,
    AddSaleModule,
    SaleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
