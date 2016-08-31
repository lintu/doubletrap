/**
 * Created by Lintu on 14-08-2016.
 */
import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
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
    userItems$: FirebaseObjectObservable<any>;
    defaultList$: FirebaseListObservable<any>;
    allItems$: FirebaseListObservable<any>
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
            var song = new Song(songDetails);

            this.userItems$ = this.af.database.object('/all-songs/' + song.songId + '/');
            this.userItems$.set(song);
            this.userItems$ = this.af.database.object('/user-data/'+ this.userData.getUserId() + '/songs/' + song.songId + '/');
            this.userItems$.set(song);
            this.defaultList$ = this.af.database.list('/user-data/'+ this.userData.getUserId() + '/lists/default/songs/');
            this.defaultList$.push(song.songId);
            

        }).catch(error => {
            alert(error);
        });
    }
}