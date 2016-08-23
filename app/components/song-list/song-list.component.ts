/**
 * Created by 473508 on 8/19/2016.
 */
import { Component } from '@angular/core';
import { AngularFire} from 'angularfire2';
import { UserData } from './../login/user-data.service';
import { Observable } from 'rxjs/observable';
// import { MASONRY_DIRECTIVES } from 'angular2-masonry';

@Component({
    selector: 'song-list',
    templateUrl: './app/components/song-list/song-list.html',
    directives: [],
    styleUrls: ['./app/components/song-list/song-list.style.css']
})

export class SongListComponent {
    songList: Observable<any>;
    constructor(private af: AngularFire, public userData: UserData) {
        userData.isLoggedIn.subscribe(isLoggedIn => {
           if(isLoggedIn) {
                this.songList = af.database.list('/user-songs/' + userData.getUserId() + '/');
           }  else {
               this.songList = new Observable();
           }
        });
    }
}