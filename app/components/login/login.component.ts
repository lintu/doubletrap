/**
 * Created by Lintu on 14-08-2016.
 */
import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserData} from './../login/user-data.service';


@Component({
    selector: 'login',
    templateUrl : './app/components/login/login.component.html',
    styleUrls: ['./app/components/login/login.style.css']
})
export class LoginComponent {
    loginText: string;
    profileImgUrl: string;
    loggedIn: boolean;
    constructor(private af: AngularFire, private userData: UserData) {
        this.af.auth.subscribe(auth => {
            if(auth) {
                this.loggedIn = true;
                userData.setUserId(auth.auth.uid);
                this.loginText = auth.auth.displayName;
                this.profileImgUrl = auth.auth.photoURL;
            } else {
                this.loggedIn = false;
                this.loginText = 'You are not logged in';
                userData.setUserId('');
            }
        });
    }

    loginWithGoogle() {
        this.af.auth.login();
    }

    logout() {
        this.af.auth.logout();
    }
}