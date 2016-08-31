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
/**
 * Created by Lintu on 14-08-2016.
 */
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var user_data_service_1 = require('./../login/user-data.service');
var LoginComponent = (function () {
    function LoginComponent(af, userData) {
        var _this = this;
        this.af = af;
        this.userData = userData;
        this.loginSubscription = this.af.auth.subscribe(function (auth) {
            if (auth) {
                userData.setUserId(auth.auth.uid);
                _this.loginText = auth.auth.displayName;
                _this.profileImgUrl = auth.auth.photoURL;
            }
            else {
                _this.loginText = 'You are not logged in';
                userData.setUserId('');
            }
        });
    }
    LoginComponent.prototype.loginWithGoogle = function () {
        this.af.auth.login();
    };
    LoginComponent.prototype.logout = function () {
        this.af.auth.logout();
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        this.loginSubscription.unsubscribe();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './app/components/login/login.component.html',
            styleUrls: ['./app/components/login/login.style.css']
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, user_data_service_1.UserData])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map