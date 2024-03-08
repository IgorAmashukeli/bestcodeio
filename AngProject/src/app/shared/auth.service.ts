import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: Auth, private router: Router) {}

  googleSigIn() {
    return signInWithRedirect(this.fireauth, new GoogleAuthProvider());
  }
}
