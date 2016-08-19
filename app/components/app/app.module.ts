import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { LoginComponent } from '../login/login.component';
import { UploadComponent } from '../upload/upload.component';
import {SongListComponent} from "../song-list/song-list.component";


@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ AppComponent, LoginComponent, UploadComponent, SongListComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
