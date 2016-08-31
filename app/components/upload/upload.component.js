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
var upload_service_1 = require('./../upload/upload.service');
var user_data_service_1 = require('./../login/user-data.service');
var song_1 = require('./../song-list/song');
var UploadComponent = (function () {
    function UploadComponent(uploadService, af, userData) {
        this.uploadService = uploadService;
        this.af = af;
        this.userData = userData;
    }
    UploadComponent.prototype.fileChanged = function (newFileEvent) {
        this.fileToUpload = newFileEvent.target.files[0];
    };
    UploadComponent.prototype.upload = function () {
        var _this = this;
        if (!this.fileToUpload) {
            alert('please select a file');
            return;
        }
        this.uploadService.upload(this.fileToUpload).then(function (response) {
            var songDetails = response['tags'];
            var song = new song_1.Song(songDetails);
            _this.userItems$ = _this.af.database.object('/all-songs/' + song.songId + '/');
            _this.userItems$.set(song);
            _this.userItems$ = _this.af.database.object('/user-data/' + _this.userData.getUserId() + '/songs/' + song.songId + '/');
            _this.userItems$.set(song);
            _this.defaultList$ = _this.af.database.list('/user-data/' + _this.userData.getUserId() + '/lists/default/songs/');
            _this.defaultList$.push(song.songId);
        }).catch(function (error) {
            alert(error);
        });
    };
    UploadComponent = __decorate([
        core_1.Component({
            selector: 'upload',
            templateUrl: './app/components/upload/upload.component.html',
            styleUrls: ['./app/components/upload/upload.style.css'],
            providers: [upload_service_1.UploadService]
        }), 
        __metadata('design:paramtypes', [upload_service_1.UploadService, angularfire2_1.AngularFire, user_data_service_1.UserData])
    ], UploadComponent);
    return UploadComponent;
}());
exports.UploadComponent = UploadComponent;
//# sourceMappingURL=upload.component.js.map