import { Injectable } from '@angular/core';
import { UserData } from './../login/user-data.service';
import { Observable } from 'rxjs/Observable';

//TODO : upload progress, scope inside promise function, image extraction


@Injectable()
export class UploadService {
    url: string;
    constructor(public userData: UserData) {
        this.url = '/upload';
    }

    upload(file) {

        let userId = this.userData.getUserId();

        var promise = new Promise((resolve, reject) => {

            var fd = new FormData();
            fd.append('file', file);
            fd.append('userId', userId);
            //fd.append('imageDataUri', imageDataUri);
            //fd.append('imageFormat', imageFormat);

            var xhr = new XMLHttpRequest();

            xhr.open('post', '/upload?userId='+ userId+ '', true);
            xhr.send(fd);

            xhr.onreadystatechange = function () {
                if(xhr.readyState === XMLHttpRequest.DONE) {
                    if(xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.onprogress = function(event) {
                if(event.lengthComputable) {
                    console.log("Progress: " + Math.round((event.loaded / event.total)*100));
                    //this.uploadProgress =
                }
            }
        });
        return promise;
    }
}