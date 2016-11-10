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
import { NewProductComponent }        from './components/new_product/new_product.component';
import { ProductComponent }        from './components/product/product.component';


import { UserService }          from './components/shared/services/user.service';
import { ProductService }       from './components/shared/services/product.service';


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
                    ProductService  
                  ],
  declarations  : [ AppComponent, 
                    HeaderComponent,
                    HomeComponent,
                    FooterComponent,
                    TrendyComponent,
                    LoginComponent,
                    RegisterComponent,
                    ItemComponent,
                    NewProductComponent,
                    ProductComponent
                  ],
  bootstrap     : [ AppComponent 
                  ]
})
export class AppModule { }
