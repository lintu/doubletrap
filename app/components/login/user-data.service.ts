/**
 * Created by Lintu on 15-08-2016.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class UserData {
    private userId: string;
    constructor() {

    }
    setUserId (userId: string) {
        this.userId = userId;
    }
    getUserId () {
        return this.userId;
    }
}