import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { signInWithPopup } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: Auth, private router: Router) {}

  googleSigIn() {
    return signInWithPopup(this.fireauth, new GoogleAuthProvider()).then(
      (res) => {
        this.router.navigate(['/']);
        localStorage.setItem('token', JSON.stringify(res.user?.uid));
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
