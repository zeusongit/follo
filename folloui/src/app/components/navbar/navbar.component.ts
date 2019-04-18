import { AppState } from './../../app.state';
import { Store } from '@ngrx/store';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { NavTabService } from 'src/app/services/main-content.service';
import { Observable } from 'rxjs';

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
}
