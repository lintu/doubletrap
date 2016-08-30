/**
 * Created by 473508 on 8/19/2016.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserData } from './../login/user-data.service';
import { Observable } from 'rxjs/observable';
import { Subscription } from 'rxjs/Subscription';
import { SongService } from './../song-list/song.service';
import {Song} from './../song-list/song';
import { DataService} from './../shared/data.service';

@Component({
    selector: 'player',
    templateUrl: './app/components/player/player.html',
    directives: [],
    styleUrls: ['./app/components/player/player.style.css']
})

export class PlayerComponent implements OnInit, OnDestroy {
    private audioContext: AudioContext;
    private audioNodes: Object;
    private volume:  Number;
    public activeSong: Song;
    public userLoginSubscription: Subscription;
    public songServiceSubscription: Subscription;
    public activeSongData: AudioBuffer;
    constructor(public userData: UserData, private songService: SongService, private dataService: DataService) {
        this.audioContext = new AudioContext();
        this.audioNodes = {};
        this.volume = 10.0;
        this.activeSong = new Song();
        this.userLoginSubscription = userData.isLoggedIn$.subscribe(isLoggedIn => {
           if(isLoggedIn) {
                //TODO do thing onlogin
           }  else {

           }
        });

        this.songServiceSubscription = songService.activeSong$.subscribe((activeSong) => {
            this.activeSong = activeSong;
            
            this.dataService.getSong(this.activeSong.songUrl).then((audioData)=>{
                this.processSongArrayBuffer(audioData);
            }).catch((response) => {
                alert(response);
            });
        });

    }
    ngOnInit() {
        this.createAudioNodes();
        this.connectAudioNodes();
    }

    private processSongArrayBuffer(audioData: ArrayBuffer) {
        this.audioContext.decodeAudioData(audioData, buffer => {
            console.log('done decoding');
            this.activeSongData = buffer;
            this.activeSong.duration = buffer.duration;
            this.start(0);
        });
    }

    private createAudioNodes() {
        this.audioNodes['source'] = this.audioContext.createBufferSource();
        
        this.audioNodes['analyser1'] = this.audioContext.createAnalyser();
        this.audioNodes['analyser1'].smoothingTimeConstant = 0.3;
        this.audioNodes['analyser1'].fftSize = 1024;
        
        this.audioNodes['analyser2'] = this.audioContext.createAnalyser();
        this.audioNodes['analyser2'].smoothingTimeConstant = 0.3;
        this.audioNodes['analyser2'].fftSize = 1024;

        this.audioNodes['splitter'] = this.audioContext.createChannelSplitter(2);
        this.audioNodes['merger'] = this.audioContext.createChannelMerger(2);
        this.audioNodes['distortion'] = this.audioContext.createWaveShaper();
        this.audioNodes['gain'] = this.audioContext.createGain();
        this.audioNodes['biquad'] = this.audioContext.createBiquadFilter();
        this.audioNodes['convolver'] = this.audioContext.createConvolver();

        this.audioNodes['gain'].gain.value = 1;
        this.audioNodes['biquad'].frequency.value = 0;
        this.audioNodes['biquad'].type = 'highpass';
    }

    private connectAudioNodes() {
        this.audioNodes['source'].connect(this.audioNodes['splitter']);
        this.audioNodes['splitter'].connect(this.audioNodes['analyser1'], 0, 0);
        this.audioNodes['splitter'].connect(this.audioNodes['analyser2'], 1, 0);

        this.audioNodes['analyser1'].connect(this.audioNodes['merger'], 0, 0);
        this.audioNodes['analyser2'].connect(this.audioNodes['merger'], 0, 1);

        this.audioNodes['merger'].connect(this.audioNodes['distortion'], 0, 0);
        this.audioNodes['distortion'].connect(this.audioNodes['biquad']);
        this.audioNodes['biquad'].connect(this.audioNodes['gain'], 0, 0);
        this.audioNodes['gain'].connect(this.audioContext.destination, 0 , 0);
    }

    private start(startFrom) {
        if(this.audioNodes['source']) {
            if (this.audioNodes['source'].buffer) {
                this.audioNodes['source'].stop();
            }

            this.audioNodes['source'] = this.audioContext.createBufferSource();
            this.audioNodes['source'].buffer = this.activeSongData;
            
            this.connectAudioNodes();

            this.audioNodes['source'].start(0, startFrom);
            this.audioNodes['source'].loop = false;
        }
    }
    resume() {
        alert('start playing');
    }
    previous() {
        alert('previious');
    }
    next() {
        alert('start playing');
    }

    ngOnDestroy() {
        this.userLoginSubscription.unsubscribe();
        this.songServiceSubscription.unsubscribe();
    }
}