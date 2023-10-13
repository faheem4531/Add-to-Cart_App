import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { CartComponent } from 'src/app/components/cart/cart.component';
import { ProductDetailsComponent } from 'src/app/components/product-details/product-details.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { ProductsComponent } from 'src/app/components/products-list/products-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductDetailsComponent,
    LoaderComponent,
    ProductsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
