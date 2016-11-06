import { Component }      from '@angular/core';
import { Router }         from '@angular/router';
import { FormBuilder, FormGroup }      from '@angular/forms';

import { UserService }    from '../shared/services/user.service';

@Component({
  selector      : 'my-register',
  templateUrl   : 'app/components/register/register.template.html'
})
export class RegisterComponent {

  form: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService)
  {
      this.form = this.fb.group({
        name      : '',
        lastname  : '',
        type      : false,
        email     : '',
        username  : '',
        password  : '',
      })
  }

  register(){
    const sc = this;
    sc.loading = true;
    sc.userService.register(sc.form.value).subscribe((result) => {
      if (result.success) {
        //sc.userService.({username: sc.form.value.username, password: sc.form.value.password});
        sc.userService.login({username: sc.form.value.username, password: sc.form.value.password})
                      .subscribe((result) => {
                        if (result.success) {
                          sc.router.navigate(['/']); 
                        }
                        else {
                            // login failed
                            sc.router.navigate(['/login']);
                            sc.error = result.msg;
                            sc.loading = false;
                        }
                      }); 
      }
      else {
          // login failed
          sc.error = result.msg;
          sc.loading = false;
      }
    });
  }

 }