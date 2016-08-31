/**
 * Created by Lintu on 14-08-2016.
 */
import { Component, OnDestroy } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserData} from './../login/user-data.service';
import { Subscription } from 'rxjs/Subscription'


@Component({
    selector: 'login',
    templateUrl : './app/components/login/login.component.html',
    styleUrls: ['./app/components/login/login.style.css']
})
export class LoginComponent implements OnDestroy{
    loginText: string;
    profileImgUrl: string;
    private loginSubscription: Subscription;
    constructor(private af: AngularFire, private userData: UserData) {
        this.loginSubscription = this.af.auth.subscribe(auth => {
            if(auth) {
                userData.setUserId(auth.auth.uid);
                this.loginText = auth.auth.displayName;
                this.profileImgUrl = auth.auth.photoURL;
            } else {
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

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
    }
}