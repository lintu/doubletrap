/**
 * Created by 473508 on 8/19/2016.
 */
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AngularFire} from 'angularfire2';
import { UserData } from './../login/user-data.service';
import { Observable } from 'rxjs/observable';
import { Subscription }   from 'rxjs/Subscription';
import { SongService }   from './../song-list/song.service';
import { Song, ActiveSong } from './../song-list/song';

@Component({
    selector: 'song-list',
    templateUrl: './app/components/song-list/song-list.html',
    styleUrls: ['./app/components/song-list/song-list.style.css']
})

export class SongListComponent implements OnDestroy, OnInit {
    @Input() playListId: string = '';
    
    private songList: Song[];
    userDataSubscription: Subscription;
    songListSubscription: Subscription;
    setNextSongSubscription: Subscription;

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
        
        this.songService.activeSong$.subscribe(activeSong => {
            if(activeSong.playListId === this.playListId) {
                //yay playing from my list
                //make the changes for now playing
            } else {
                //i am not used now
                //reset any changes for now playing
            }
        });

        this.songService.nextSongIdentifier$.subscribe(activeSong => {
            if(activeSong.playListId === this.playListId) {
                this.songService.setNextSong(this.getNextSong(activeSong.songId))
            }
        })
    }

    getNextSong (currentSongId): Song {
        var songListLength = this.songList.length;
        for(var i=0; i< songListLength; i++) {
            if(this.songList[i].songId === currentSongId) {
                var nextIndex = i + 1 >= songListLength ? 0 : i + 1;
                return this.songList[nextIndex];
            }
        }
    }
    setActive(songObj: Song, index: number) {
        this.songService.setActiveSong(songObj, this.playListId);
    }

    ngOnDestroy() {
        this.userDataSubscription.unsubscribe();
        this.userDataSubscription.unsubscribe();
        this.setNextSongSubscription.unsubscribe();
    }
}