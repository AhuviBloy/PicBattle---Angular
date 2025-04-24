import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { ChallengeListComponent } from '../components/challenge-list/challenge-list.component';

export const routes: Routes = [
  { path: 'challenge', component: ChallengeListComponent },
  { path: 'home', component: HomePageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
