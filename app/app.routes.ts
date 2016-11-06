import { RouterModule } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NewProductComponent }        from './components/new_product/new_product.component';




const routes = [
    { path: '', component: HomeComponent  },
    { path: 'login', component: LoginComponent  },
    { path: 'register', component: RegisterComponent  },
    { path: 'new/product', component: NewProductComponent  }
];


export default RouterModule.forRoot(routes);