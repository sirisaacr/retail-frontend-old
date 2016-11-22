import { Component } from '@angular/core';
import { Router, NavigationExtras }         from '@angular/router';

import { UserService }    from '../shared/services/user.service';
import { CartService }    from '../shared/services/cart.service';
import { ProductService }    from '../shared/services/product.service';

@Component({
  selector      : 'my-header',
  templateUrl   : 'app/components/header/header.template.html'
})
export class HeaderComponent { 

  flag: boolean = true;

  search: string;
  searchCategory: string;

  cart:any;

  categories: any;

  constructor(public router: Router, 
              public cartService: CartService,
              public productService: ProductService,
              public userService: UserService){
        this.search = '';
        this.searchCategory = '';
  }

  ngOnInit(){
      this.categories = this.productService.categories;
      this.productService.getCategories();
  }

  isLoggedIn(){
    const flag = this.userService.isLoggedIn();
    return flag;
  }

  isSeller(){
    const flag = this.userService.isSeller();
    return flag;
  }

  validation(){
    if(this.isLoggedIn() && this.flag){
      this.flag = false;
      this.cart = this.cartService.products;
      this.cartService.getCart();
      return true;
    }
    else if(this.isLoggedIn() && !this.flag){
      return true;
    }
  }

  logout(){
    this.flag = true;
    this.userService.logout();
    this.cartService.logout();
  }

  searchProducts(){
    this.productService.searchProducts(this.search, this.searchCategory);
    if(this.searchCategory != ''){
      this.router.navigate([ '/search'], { queryParams: {search: this.search, category: this.searchCategory}});      
    }
    else{
      this.router.navigate([ '/search'], { queryParams: {search: this.search}});
    }
  }


}
