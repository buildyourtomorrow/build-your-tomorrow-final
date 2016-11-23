import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  //Store profile object in auth class
  user: any;

  // Configure Auth0
  lock = new Auth0Lock('EscYrnfdxcDUs3WJeJL1edHhLVrlFQtB', 'buildyourtomorrow.auth0.com', {
    theme: {
      logo: "/app/images/Auth0Logo.png",
      primaryColor: "#BAB1B1"
    },
    languageDictionary: {
      title: "BYT"
    },
    auth: {
     redirect: true,
     redirectUrl: "",
     responseType: "token"
    }
  });

  constructor(private _router: Router, public authHttp: AuthHttp) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult:any) => {
      this.lock.getProfile(authResult.idToken, (error:any, profile:any) => {
        if(error){
          throw new Error(error);
        }

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));

        this.authHttp.post('/create-user', profile).subscribe(user => this.user = user, err => console.log(err));
      })
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  };
}