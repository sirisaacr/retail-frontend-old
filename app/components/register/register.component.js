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
var RegisterComponent = (function () {
    function RegisterComponent(fb, router, userService) {
        this.fb = fb;
        this.router = router;
        this.userService = userService;
        this.loading = false;
        this.error = '';
        this.form = this.fb.group({
            name: '',
            lastname: '',
            type: false,
            email: '',
            username: '',
            password: '',
        });
    }
    RegisterComponent.prototype.register = function () {
        var sc = this;
        sc.loading = true;
        sc.userService.register(sc.form.value).subscribe(function (result) {
            if (result.success) {
                //sc.userService.({username: sc.form.value.username, password: sc.form.value.password});
                sc.userService.login({ username: sc.form.value.username, password: sc.form.value.password })
                    .subscribe(function (result) {
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
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'my-register',
            templateUrl: 'app/components/register/register.template.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, user_service_1.UserService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map