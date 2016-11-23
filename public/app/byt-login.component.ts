import {Component, OnInit} from '@angular/core';

import {Auth} from "./auth.service";

@Component({
	selector: 'byt-login',
	templateUrl: '/app/byt-login.component.html',
	styleUrls: ['app/byt-login.component.css']
})
export class BYTLoginComponent implements OnInit {

	constructor (private _auth: Auth) {}

	ngOnInit(){
		this._auth.login();
	};
}