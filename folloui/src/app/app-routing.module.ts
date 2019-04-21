import { ViewCommunityDetailComponent } from './components/view-community-detail/view-community-detail.component';
import { CreateCommunityComponent } from './components/create-community/create-community.component';
import { HomeComponent } from './components/home/home.component';
import { MainContentGridComponent } from './components/main-content-grid/main-content-grid.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { ContentComponent } from './components/content/content.component'

const routes: Routes = [
  { path: '', redirectTo: 'content', pathMatch: 'full'},
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'community/create', component: CreateCommunityComponent },
  { path: 'community/:commname',  component: ViewCommunityDetailComponent },
  { path: 'content', component: ContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
