// dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './sign_in_dialog.component.html',
  styleUrls: ['./sign_in_dialog.component.css'],
  imports: [CommonModule],
})
export class SignInDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SignInDialogComponent>,
    public authService: AuthService,
    public auth: Auth,
    private dataService: DataService
  ) {}

  ngOnInit(): void {}

  public closeDialog(): void {
    this.dialogRef.close();
  }

  createUserInfo(user_uid: string) {
    this.dataService.createUserData(user_uid).subscribe({
      next: (response) => {
        console.log('User info created:', response);
      },
      error: (error) => {
        console.error('Error creating user info:', error);
      },
    });
  }

  signInWithGoogle() {
    this.authService.googleSignIn();
    this.closeDialog();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.dataService.fetchUserData(user.uid).subscribe({
          next: (users: any[]) => {
            if (users.length == 0) {
              this.createUserInfo(user.uid);
            }
          },
          error: (error: any) => {
            console.error('Error fetching problem:', error);
          },
        });
      } else {
      }
    });
  }

  signOut() {
    this.authService.googleSignOut();
    this.closeDialog();
  }
}
