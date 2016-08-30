import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { LoginComponent } from '../login/login.component';
import { UploadComponent } from '../upload/upload.component';
import {SongListComponent} from "../song-list/song-list.component";
import {PlayerComponent} from "../player/player.component";


@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ AppComponent, LoginComponent, UploadComponent, SongListComponent, PlayerComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }


//good practise to use providers in module level since it will be created only once
//providers used at component level is created for every instance of component.