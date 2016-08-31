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
var song_service_1 = require('./../song-list/song.service');
var SongListComponent = (function () {
    function SongListComponent(af, userData, songService) {
        this.af = af;
        this.userData = userData;
        this.songService = songService;
        this.playListId = '';
    }
    SongListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userDataSubscription = this.userData.isLoggedIn$.subscribe(function (isLoggedIn) {
            if (isLoggedIn) {
                _this.songListSubscription = _this.af.database.list('/user-data/' + _this.userData.getUserId() + '/songs/').subscribe(function (songList) {
                    _this.songList = songList;
                });
            }
            else {
                _this.songList = [];
            }
        });
    };
    SongListComponent.prototype.setActive = function (songObj, index, first, last) {
        this.songService.setActiveSong(songObj);
        debugger;
        //set next 
        //fetch the item from this.songList
        //set previous
    };
    SongListComponent.prototype.ngOnDestroy = function () {
        this.userDataSubscription.unsubscribe();
        this.userDataSubscription.unsubscribe();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SongListComponent.prototype, "playListId", void 0);
    SongListComponent = __decorate([
        core_1.Component({
            selector: 'song-list',
            templateUrl: './app/components/song-list/song-list.html',
            directives: [],
            styleUrls: ['./app/components/song-list/song-list.style.css']
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, user_data_service_1.UserData, song_service_1.SongService])
    ], SongListComponent);
    return SongListComponent;
}());
exports.SongListComponent = SongListComponent;
//# sourceMappingURL=song-list.component.js.map