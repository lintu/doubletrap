import { Component } from '@angular/core';
import { defaultFirebase, FIREBASE_PROVIDERS, firebaseAuthConfig, AuthProviders, AuthMethods} from 'angularfire2';
import { UserData} from './../login/user-data.service';
import { SongService } from './../song-list/song.service';
import { DataService } from './../shared/data.service';

@Component({
    selector: 'my-app',
    templateUrl: './app/components/app/app.component.html',
    styleUrls: [],
    providers: [
        FIREBASE_PROVIDERS,
        defaultFirebase({
            apiKey: "AIzaSyDFPln30pb_nGg5z9dyjqLhxFRQO9CCZRo",
            authDomain: "doubletrap-e1fb4.firebaseapp.com",
            databaseURL: "https://doubletrap-e1fb4.firebaseio.com",
            storageBucket: "doubletrap-e1fb4.appspot.com",
        }),
        firebaseAuthConfig({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup
        }),
        UserData,
        SongService,
        DataService
    ]
})
export class AppComponent {

}
