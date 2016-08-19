import { Injectable } from '@angular/core';

@Injectable()
export class ImageExtractor {
    sourceFile: File;
    constructor() {

    }
    extract(file) {
        return new Promise((resolve, reject) => {
            // jsmediatags.read(file, {
            //     onSuccess: function (tag) {
            //         var dataUrl = '';
            //         if (tag.tags.picture) {
            //             var base64String = "";
            //             for (var i = 0; i < tag.tags.picture.data.length; i++) {
            //                 base64String += String.fromCharCode(tag.tags.picture.data[i]);
            //             }
            //             dataUrl = window.btoa(base64String);
            //             resolve({dataUri: dataUrl, imageFormat: tag.tags.picture.format});
            //         } else {
            //             resolve({});
            //         }
            //     },
            //     onError: function (error) {
            //         console.log(error);
            //         reject(null);
            //     }
            // });
        });
    }
    initJsMediaTags() {
        
    }
}