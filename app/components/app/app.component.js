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
var angularfire2_1 = require('angularfire2');
var user_data_service_1 = require('./../login/user-data.service');
var song_service_1 = require('./../song-list/song.service');
var data_service_1 = require('./../shared/data.service');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app/components/app/app.component.html',
            styleUrls: [],
            providers: [
                angularfire2_1.FIREBASE_PROVIDERS,
                angularfire2_1.defaultFirebase({
                    apiKey: "AIzaSyDFPln30pb_nGg5z9dyjqLhxFRQO9CCZRo",
                    authDomain: "doubletrap-e1fb4.firebaseapp.com",
                    databaseURL: "https://doubletrap-e1fb4.firebaseio.com",
                    storageBucket: "doubletrap-e1fb4.appspot.com",
                }),
                angularfire2_1.firebaseAuthConfig({
                    provider: angularfire2_1.AuthProviders.Google,
                    method: angularfire2_1.AuthMethods.Popup
                }),
                user_data_service_1.UserData,
                song_service_1.SongService,
                data_service_1.DataService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map