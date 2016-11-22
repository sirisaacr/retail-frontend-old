"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var user_service_1 = require('../shared/services/user.service');
var LoginComponent = (function () {
    function LoginComponent(router, userService, fb) {
        this.router = router;
        this.userService = userService;
        this.fb = fb;
        this.loading = false;
        this.error = '';
        this.form = this.fb.group({
            username: '',
            password: ''
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        // const sc = this;
        // this.userService.isLoggedIn()
        //                 .subscribe((result) => {
        //                     if(result.success){
        //                         this.router.navigate(['/']);
        //                     }
        //                 });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var sc = this;
        sc.loading = true;
        sc.userService.login(sc.form.value).subscribe(function (result) {
            if (result.success) {
                sc.router.navigate(['/']);
            }
            else {
                // login failed
                _this.error = result.msg;
                _this.loading = false;
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'my-login',
            templateUrl: 'app/components/login/login.template.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService, forms_1.FormBuilder])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map