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
 * Created by 473508 on 8/19/2016.
 */
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var user_data_service_1 = require('./../login/user-data.service');
var observable_1 = require('rxjs/observable');
// import { MASONRY_DIRECTIVES } from 'angular2-masonry';
var SongListComponent = (function () {
    function SongListComponent(af, userData) {
        var _this = this;
        this.af = af;
        this.userData = userData;
        userData.isLoggedIn.subscribe(function (isLoggedIn) {
            if (isLoggedIn) {
                alert('is logged in ');
                _this.songList = af.database.list('/user-songs/' + userData.getUserId() + '/');
            }
            else {
                alert('not logged in');
                _this.songList = new observable_1.Observable();
            }
        });
        console.log(this.userData.getUserId());
        debugger;
    }
    SongListComponent = __decorate([
        core_1.Component({
            selector: 'song-list',
            templateUrl: './app/components/song-list/song-list.html',
            directives: [],
            styleUrls: ['./app/components/song-list/song-list.style.css']
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, user_data_service_1.UserData])
    ], SongListComponent);
    return SongListComponent;
}());
exports.SongListComponent = SongListComponent;
//# sourceMappingURL=song-list.component.js.map