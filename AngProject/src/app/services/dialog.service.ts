// dialog.service.ts
import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(
    width: string = 'auto',
    height: string = 'auto',
    component: any
  ): MatDialogRef<any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = width;
    dialogConfig.height = height;

    return this.dialog.open(component, dialogConfig);
  }

  closeDialog(dialogRef: MatDialogRef<any>) {
    if (dialogRef) {
      dialogRef.close();
    }
  }
}
