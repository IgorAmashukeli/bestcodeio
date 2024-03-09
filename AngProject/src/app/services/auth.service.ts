import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { signInWithPopup } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(public fireauth: Auth, private router: Router) {
    this.fireauth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn.next(true);
      } else {
        this.loggedIn.next(false);
      }
    });
  }

  googleSignIn() {
    return signInWithPopup(this.fireauth, new GoogleAuthProvider()).then(
      (res) => {
        const currentUrl = this.router.url;
        this.router.navigate([currentUrl]);
        localStorage.setItem('token', JSON.stringify(res.user?.uid));
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  googleSignOut() {
    this.fireauth.signOut().then(
      () => {
        this.router.navigate(['/']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  public isLoggedIn(): boolean {
    return !!this.loggedIn.value;
  }
}
