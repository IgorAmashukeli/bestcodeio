import { Routes, Router } from '@angular/router';
import { MathComponent } from './math/math.component';
import { ProgrammingComponent } from './programming/programming.component';
import { HomeComponent } from './home/home.component';
import { ProblemsComponent } from './problems/problems.component';
import { AuthGuard } from './services/auth_guard.service';
import { inject } from '@angular/core';
import { WarningDialogComponent } from './warning_dialog/warning_dialog.component';

const routesSimple: Routes = [
  { path: '', component: HomeComponent },
  { path: 'math', component: MathComponent },
  {
    path: 'programming',
    component: ProgrammingComponent,
  },
];

export const mathRouteNames: Array<string> = [
  'logic',
  'set',
  'combinatorics',
  'graph',
  'algebra',
  'computation',
  'linear',
  'calculus',
  'complex',
  'probability',
  'topology',
  'functionalAn',
  'differential',
  'algtop',
  'number',
  'category',
];

export const mathTitles: Array<string> = [
  'Logic',
  'Set theory',
  'Combinatorics',
  'Graph theory',
  'Algebra',
  'Theory of computation',
  'Linear algebra and geometry',
  'Calculus',
  'Complex analysis',
  'Probability theory',
  'Functional analysis',
  'Topology',
  'Differential geometry',
  'Algebraic topology',
  'Number theory',
  'Category theory',
];

const mathRoutes: Routes = mathRouteNames.map((path, index) => ({
  path: 'math/' + path,
  component: ProblemsComponent,
  data: { title: mathTitles[index] },
}));

export const programmingRouteNames: Array<string> = [
  'hardware',
  'compiler',
  'dsa',
  'streaming',
  'external',
  'operating',
  'concurrency',
  'functionalProg',
  'distributed',
  'networking',
  'databases',
  'security',
  'system',
  'manAn',
  'ml',
  'quantum',
];

export const programmingTitles: Array<string> = [
  'Computer architecture',
  'Compilers and translators',
  'Data structures and algorithms',
  'Streaming algorithms',
  'External memory algorithms',
  'Operating systems',
  'Concurrency',
  'Functional programming',
  'Distributed systems',
  'Networking',
  'Databases',
  'Security',
  'System design',
  'Data management/analytics',
  'Data science/Machine learning',
  'Quantum computing',
];

const programmingRoutes: Routes = programmingRouteNames.map((path, index) => ({
  path: 'programming/' + path,
  component: ProblemsComponent,
  data: { title: programmingTitles[index] },
}));

const routes_with_math: Routes = routesSimple.concat(mathRoutes);
const routes_with_math_and_programming =
  routes_with_math.concat(programmingRoutes);

routes_with_math_and_programming.push({
  path: '**',
  redirectTo: '/',
});

export const routes = routes_with_math_and_programming;
