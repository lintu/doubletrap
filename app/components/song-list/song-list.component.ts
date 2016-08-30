/**
 * Created by 473508 on 8/19/2016.
 */
import { Component, OnDestroy } from '@angular/core';
import { AngularFire} from 'angularfire2';
import { UserData } from './../login/user-data.service';
import { Observable } from 'rxjs/observable';
import { Subscription }   from 'rxjs/Subscription';
import { SongService }   from './../song-list/song.service';
import { Song } from './../song-list/song';

@Component({
    selector: 'song-list',
    templateUrl: './app/components/song-list/song-list.html',
    directives: [],
    styleUrls: ['./app/components/song-list/song-list.style.css']
})

export class SongListComponent implements OnDestroy {
    private songList: Observable<any>;
    userDataSubscription: Subscription;
    constructor(private af: AngularFire, private userData: UserData, private songService: SongService) {
        this.userDataSubscription = userData.isLoggedIn$.subscribe(isLoggedIn => {
           if(isLoggedIn) {
                this.songList = af.database.list('/user-songs/' + userData.getUserId() + '/');
           }  else {
               this.songList = new Observable();
           }
        });
    }

    setActive(songObj) {
        this.songService.setActiveSong(songObj);
    }

    ngOnDestroy() {
        this.userDataSubscription.unsubscribe();
    }
}