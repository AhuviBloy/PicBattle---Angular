import { Routes } from '@angular/router';
import { ChallengeListComponent } from './components/challenge-list/challenge-list.component';
import { CreationsListComponent } from './components/creations-list/creations-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { authGuard } from './shared/guards/auth.guard';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

export const routes: Routes = [
  {
    path: 'challenges',
    component: ChallengeListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [authGuard],
  },
  { path: 'creations/:challengeId', component: CreationsListComponent },
  {
    path: 'analytics',
    component: BarChartComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' }, // This will redirect to the home pageד
];
