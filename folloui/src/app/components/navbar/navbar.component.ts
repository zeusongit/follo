import { AppState } from './../../app.state';
import { Store } from '@ngrx/store';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import * as LoginActions from './../../actions/login.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  constructor(private store: Store<AppState>, private ls: LoginService) {
    store.select('isLoggedIn').subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.ls.doLogout('token').toPromise().then(res => {
      if (res.status === 200) {
        this.store.dispatch(new LoginActions.LoggedInStatus(false));
      } else {
        // Show error on UI
      }
    });
  }
}
