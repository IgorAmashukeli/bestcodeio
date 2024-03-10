import { Routes, Router } from '@angular/router';
import { MathComponent } from './math/math.component';
import { ProgrammingComponent } from './programming/programming.component';
import { HomeComponent } from './home/home.component';
import { ProblemsComponent } from './problems/problems.component';
import { AuthGuard } from './services/auth_guard.service';
import { inject } from '@angular/core';
import { WarningDialogComponent } from './warning_dialog/warning_dialog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'math', component: MathComponent, canActivate: [AuthGuard] },
  {
    path: 'programming',
    component: ProgrammingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'math/logic',
    component: ProblemsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: HomeComponent,
    canActivate: [
      () => {
        return inject(Router).createUrlTree(['/']);
      },
    ],
  },
];
