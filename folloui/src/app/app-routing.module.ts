import { CreateCommunityComponent } from './components/create-community/create-community.component';
import { HomeComponent } from './components/home/home.component';
import { MainContentGridComponent } from './components/main-content-grid/main-content-grid.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'createcommunity', component: CreateCommunityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
