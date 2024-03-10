// dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

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
    public auth: AuthService
  ) {}

  ngOnInit(): void {}

  public closeDialog(): void {
    this.dialogRef.close();
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
    this.closeDialog();
  }

  signOut() {
    this.auth.googleSignOut();
    this.closeDialog();
  }
}
