import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { ChallengeListComponent } from '../components/challenge-list/challenge-list.component';
import { UserListComponent } from '../components/user-list/user-list.component';
import { authGuard } from '../guards/auth.guard';
import { CreationsListComponent } from '../components/creations-list/creations-list.component';

// export const routes: Routes = [
//   { path: 'challenge', component: ChallengeListComponent },
//   { path: 'home', component: HomePageComponent},
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: '**', redirectTo: '/home' },
// ];

// export const routes: Routes = [
//   { path: 'home', component: HomePageComponent},
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'challenges', component: ChallengeListComponent },
//   { path: 'users', component: UserListComponent },
//   { path: '**', redirectTo: '/home' }
// ];

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
  { path: '**', redirectTo: '' }, // This will redirect to the home pageד
];
