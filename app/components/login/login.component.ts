import { Component }      from '@angular/core';
import { Router }         from '@angular/router';
import { FormBuilder, FormGroup }      from '@angular/forms';

import { UserService }    from '../shared/services/user.service';

@Component({
  selector      : 'my-login',
  templateUrl   : 'app/components/login/login.template.html'
})
export class LoginComponent { 

  form: FormGroup;
  loading = false;
  error = '';

  constructor(private router: Router, 
              private userService: UserService,
              public fb: FormBuilder) 
  {
      this.form = this.fb.group({
        username: '',
        password: ''
      });            
  }

  ngOnInit() {
    if(this.userService.isLoggedIn())
    {
        this.router.navigate(['/']);
    }
  }

  login() {
    const sc = this;
    sc.loading = true;
    sc.userService.login(sc.form.value).subscribe((result) => {
      if (result.success) {
        sc.router.navigate(['/']); 
      }
      else {
          // login failed
          this.error = result.msg;
          this.loading = false;
      }
    });
  }
}