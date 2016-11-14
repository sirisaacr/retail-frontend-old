import { Component } from '@angular/core';
import { Router }         from '@angular/router';

import { UserService }    from '../shared/services/user.service';
import { CartService }    from '../shared/services/cart.service';

@Component({
  selector      : 'my-header',
  templateUrl   : 'app/components/header/header.template.html'
})
export class HeaderComponent { 

  flag: boolean = true;

  cart:any;

  constructor(public router: Router, 
              public cartService: CartService,
              public userService: UserService){

  }

  ngOnInit(){
    
  }

  isLoggedIn(){
    const flag = this.userService.isLoggedIn();
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

  // getCartSize(){
  //   this.cartService.getCart()
  //                   .subscribe((response) =>{
  //                       let success = response.json() && response.json().success;
  //                       if (success) {
  //                           this.cartSize = response.json().cart.products.length;
  //                       } 
  //                       else {
  //                           // return false to indicate failed
  //                           let msg = response.json() && response.json().msg;
  //                       }
  //                   });
  // }

  logout(){
    this.flag = true;
    this.userService.logout();
    this.cartService.logout();
    this.redirectToHome();
  }

  redirectToLogin(){
    if(this.isLoggedIn()){
      this.redirectToHome();
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  redirectToRegister(){
    this.router.navigate(['register']);
  }

  redirectToNewProduct(){
    this.router.navigate(['new', 'product']);
  }

  redirectToHome(){
    this.router.navigate(['/']);
  }

  redirectToCart(){
    this.router.navigate(['cart']);
  }

}
