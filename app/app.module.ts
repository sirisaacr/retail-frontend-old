import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { RouterModule }         from '@angular/router';
import { CarouselModule }       from 'ng2-bootstrap';


import { AppComponent }         from './components/app/app.component';
import { HeaderComponent }      from './components/header/header.component';
import { HomeComponent }        from './components/home/home.component';
import { FooterComponent }      from './components/footer/footer.component';
import { TrendyComponent }      from './components/trendy/trendy.component';
import { LoginComponent }       from './components/login/login.component';
import { RegisterComponent }    from './components/register/register.component';
import { ItemComponent }        from './components/item/item.component';
import { OwnItemComponent }        from './components/own_item/own_item.component';
import { SearchedProductsComponent }        from './components/searched_products/searched_products.component';
import { OrdersComponent }        from './components/orders/orders.component';

import { NewProductComponent }        from './components/new_product/new_product.component';
import { EditProductComponent }        from './components/edit_product/edit_product.component';

import { ProductComponent }        from './components/product/product.component';
import { CartComponent }        from './components/cart/cart.component';
import { MyProductsComponent }        from './components/my_products/my_products.component';

import { UserService }          from './components/shared/services/user.service';
import { ProductService }       from './components/shared/services/product.service';
import { CartService }       from './components/shared/services/cart.service';
import { OrdersService }       from './components/shared/services/orders.service';

import routes from "./app.routes";

@NgModule({
  imports       : [ BrowserModule,
                    FormsModule,
                    ReactiveFormsModule,
                    HttpModule,
                    routes,
                    CarouselModule
                  ],
  providers     : [ UserService,
                    ProductService,
                    CartService  ,
                    OrdersService
                  ],
  declarations  : [ AppComponent, 
                    HeaderComponent,
                    HomeComponent,
                    FooterComponent,
                    TrendyComponent,
                    LoginComponent,
                    RegisterComponent,
                    ItemComponent,
                    OwnItemComponent,
                    NewProductComponent,
                    EditProductComponent,
                    ProductComponent,
                    CartComponent,
                    MyProductsComponent,
                    SearchedProductsComponent,
                    OrdersComponent
                  ],
  bootstrap     : [ AppComponent 
                  ]
})
export class AppModule { }
