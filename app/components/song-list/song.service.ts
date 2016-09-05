import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Song, ActiveSong} from './../song-list/song';


@Injectable()
export class SongService {
    public activeSong: ActiveSong; //
    public activeSong$: Subject<ActiveSong>;
    public nextSongIdentifier$: Subject<ActiveSong>;
    private nextSong: Song;
    public songHistory: ActiveSong[];
    constructor() {
        this.activeSong$ = new Subject<ActiveSong>();
        this.nextSongIdentifier$ = new Subject<ActiveSong>();
        this.songHistory = new Array<ActiveSong>();
    }

    //TODO not working as expected
    //RC: 1
    setActiveSong(songObj: Song, playListId: string) {
        if(songObj) {
            this.activeSong = <ActiveSong>songObj;
            this.activeSong.playListId = playListId;
            this.activeSong.songHistoryIndex = this.songHistory.length;
            this.songHistory.push(this.activeSong);
            this.activeSong$.next(this.activeSong);
            this.nextSongIdentifier$.next(this.activeSong);
        } else { 
            var activePlayList = this.activeSong.playListId; //this.activeSong should be defined by now!!
            var activesongHistoryIndex = this.activeSong.songHistoryIndex;
            if(activesongHistoryIndex + 1 < this.songHistory.length) {
                var newSongHistoryIndex = this.activeSong.songHistoryIndex + 1;
                this.activeSong = <ActiveSong>this.nextSong;
                this.activeSong.songHistoryIndex = newSongHistoryIndex;
            } else {
                this.activeSong = <ActiveSong>this.nextSong;
                this.activeSong.songHistoryIndex = this.songHistory.length;
                this.songHistory.push(this.activeSong);
            }
            this.activeSong.playListId = activePlayList;
            this.activeSong$.next(this.activeSong);
            if(activesongHistoryIndex + 2 < this.songHistory.length) {
                this.setNextSong(this.songHistory[activesongHistoryIndex + 2]);
            } else {
                this.nextSongIdentifier$.next(this.activeSong);
            }
        }
    }

    //previous
    setPreviousSongActive() {
        if(this.activeSong.songHistoryIndex == 0) {
            this.activeSong.currentTime = 0;
            this.activeSong$.next(this.activeSong);
        } else {
            var newActiveSong = this.songHistory[this.activeSong.songHistoryIndex - 1];
            
            this.activeSong = newActiveSong;
            this.activeSong$.next(this.activeSong);
        }
        this.setNextSong(this.songHistory[this.activeSong.songHistoryIndex + 1]);
    }
    setNextSong(songObj: Song) { // convert to Observable
        this.nextSong = songObj;
    }
}