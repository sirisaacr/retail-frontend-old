import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';


import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports       : [ BrowserModule 
                  ],
  declarations  : [ AppComponent, 
                    HeaderComponent 
                  ],
  bootstrap     : [ AppComponent 
                  ]
})
export class AppModule { }
