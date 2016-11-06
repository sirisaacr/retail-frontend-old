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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.baseUrl = "http://ec2-35-161-254-250.us-west-2.compute.amazonaws.com:3005/user";
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    UserService.prototype.login = function (user) {
        var _this = this;
        //   let user = { "username" : username, "password": password};
        return this.http
            .post(this.baseUrl + "/authenticate", user)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var success = response.json() && response.json().success;
            if (success) {
                var token = response.json() && response.json().token;
                _this.token = token;
                // set token property
                // store username and jwt token in local storage to keep user logged in between page refreshes
                var username = user.username;
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                // return true to indicate successful login
                return { success: true };
            }
            else {
                // return false to indicate failed login
                var msg = response.json() && response.json().msg;
                return { success: false, msg: msg };
            }
        });
    };
    UserService.prototype.register = function (user) {
        return this.http
            .post(this.baseUrl + "/signup", user)
            .map(function (response) {
            var success = response.json() && response.json().success;
            if (success) {
                // return true to indicate successful register
                return { success: true };
            }
            else {
                // return false to indicate failed register
                var msg = response.json() && response.json().msg;
                return { success: false, msg: msg };
            }
        });
    };
    UserService.prototype.logout = function () {
        this.token = null;
        localStorage.removeItem('currentUser');
    };
    UserService.prototype.isLoggedIn = function () {
        return this.token;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map