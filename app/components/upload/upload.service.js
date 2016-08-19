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
var user_data_service_1 = require('./../login/user-data.service');
//TODO : upload progress, scope inside promise function, image extraction
var UploadService = (function () {
    function UploadService(userData) {
        this.userData = userData;
        this.url = '/upload';
    }
    UploadService.prototype.upload = function (file) {
        var userId = this.userData.getUserId();
        var promise = new Promise(function (resolve, reject) {
            var fd = new FormData();
            fd.append('file', file);
            fd.append('userId', userId);
            //fd.append('imageDataUri', imageDataUri);
            //fd.append('imageFormat', imageFormat);
            var xhr = new XMLHttpRequest();
            xhr.open('post', '/upload?userId=' + userId + '', true);
            xhr.send(fd);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.onprogress = function (event) {
                if (event.lengthComputable) {
                    console.log("Progress: " + Math.round((event.loaded / event.total) * 100));
                }
            };
        });
        return promise;
    };
    UploadService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [user_data_service_1.UserData])
    ], UploadService);
    return UploadService;
}());
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map