/**
 * Created by Lintu on 14-08-2016.
 */
import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { UploadService } from './../upload/upload.service';
import { UserData } from './../login/user-data.service';
import { Song } from './../song-list/song';

@Component({
    selector: 'upload',
    templateUrl : './app/components/upload/upload.component.html',
    styleUrls: ['./app/components/upload/upload.style.css'],
    providers: [UploadService]
})
export class UploadComponent {
    fileToUpload: File;
    items: FirebaseObjectObservable<any>;
    constructor(private uploadService: UploadService, private af: AngularFire, public userData: UserData) {

    }

    fileChanged(newFileEvent: any) {
        this.fileToUpload = newFileEvent.target.files[0];
    }

    upload() {
        if(!this.fileToUpload) {
            alert('please select a file');
            return;
        }
        this.uploadService.upload(this.fileToUpload).then((response)=> {
            var songDetails = response['tags'];
            this.items = this.af.database.object('/user-songs/'+ this.userData.getUserId() + '/' + songDetails.songId + '/');
            
            var song = new Song(songDetails);
            
            this.items.set(song);

        }).catch(error => {
            alert(error);
        });
    }
}