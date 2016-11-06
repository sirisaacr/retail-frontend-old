import { Component } from '@angular/core';

import { UserService }    from '../shared/services/user.service';

@Component({
  selector      : 'my-header',
  templateUrl   : 'app/components/header/header.template.html'
})
export class HeaderComponent { 

  constructor(public userService: UserService){

  }

  isLogguedIn(){
    const flag = this.userService.isLoggedIn();
    return flag;
  }

  logout(){
    this.userService.logout();
  }

}
