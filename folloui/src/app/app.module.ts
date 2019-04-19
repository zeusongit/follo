import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { FormsModule } from '@angular/forms';
import { MainContentGridComponent } from './components/main-content-grid/main-content-grid.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { CreateCommunityComponent } from './components/create-community/create-community.component';
import { HomeComponent } from './components/home/home.component';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './reducers/login.reducers';
import { ViewCommunityDetailComponent } from './components/view-community-detail/view-community-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    FieldErrorDisplayComponent,
    SignupComponent,
    NavbarComponent,
    LeftSidebarComponent,
    MainContentGridComponent,
    RightSidebarComponent,
    CreateCommunityComponent,
    HomeComponent,
    ViewCommunityDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      isLoggedIn: loginReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
