/**
 * Created by 473508 on 8/19/2016.
 */
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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

export class SongListComponent implements OnDestroy, OnInit {
    @Input() playListId: string = '';
    
    private songList: Song[];
    userDataSubscription: Subscription;
    songListSubscription: Subscription;
    
    constructor(private af: AngularFire, private userData: UserData, private songService: SongService) {
    }

    ngOnInit() {
        this.userDataSubscription = this.userData.isLoggedIn$.subscribe(isLoggedIn => {
           if(isLoggedIn) {
                this.songListSubscription = this.af.database.list('/user-data/'+ this.userData.getUserId() + '/songs/').subscribe(songList => {
                    this.songList = <Song[]>songList;
                });
           }  else {
               this.songList = [];
           }
        });
    }

    setActive(songObj: Song, index: number, first: boolean, last: boolean) {
        this.songService.setActiveSong(songObj);
        var nextIndex = index + 1 > this.songList.length ? 0 : index + 1;
        var previousIndex = index- 1 < 0 ? this.songList.length - 1 : index -1;
        this.songService.setNextSong(this.songList[nextIndex]);
        this.songService.setPreviousSong(this.songList[previousIndex]);
    }

    ngOnDestroy() {
        this.userDataSubscription.unsubscribe();
        this.userDataSubscription.unsubscribe();
    }
}