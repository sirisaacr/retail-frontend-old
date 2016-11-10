import { Component } from '@angular/core';

import { UserService }    from '../shared/services/user.service';

@Component({
  selector      : 'my-header',
  templateUrl   : 'app/components/header/header.template.html'
})
export class HeaderComponent { 

  cart: any = {};

  constructor(public userService: UserService){

  }

  ngOnInit(){
    this.getBasicCart();
  }

  getBasicCart(){
    const sc = this;
    this.userService.getBasicCart().subscribe((result) => {
        if(result.success){
          sc.cart = result.cart;
        }
    });
  }

  isLogguedIn(){
    const flag = this.userService.isLoggedIn();
    return flag;
  }

  logout(){
    this.userService.logout();
  }

}
