// dialog.service.ts
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component'; // Assuming you have a DialogComponent

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(width: string = 'auto', height: string = 'auto') {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = width;
    dialogConfig.height = height;
    return this.dialog.open(DialogComponent, dialogConfig);
  }
}
