import {Component, OnInit} from '@angular/core';

import {GetBYTUser} from './byt-dashboard-overview.service';
import {Auth} from './auth.service';
 
@Component({
	selector: 'byt-nav',
	templateUrl: '/app/byt-nav.component.html',
	styleUrls: ['app/byt-nav.component.css'],
	providers: [GetBYTUser]
})
export class BYTNavComponent implements OnInit {
	nickName: string;
	constructor (private _getBYTUser: GetBYTUser, private _auth: Auth) {}

	ngOnInit(){
		this._getBYTUser.getUser().subscribe(user => {
			this.nickName = user.nickName;					
		})
	}

	logout(){
		this._auth.logout();
		window.location.href='http://app.buildyourtomorrow.com';
	}

}