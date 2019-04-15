import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { NavTabService } from 'src/app/services/main-content.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  constructor(private navTabService: NavTabService, private ls: LoginService) { }

  ngOnInit() {
    this.ls.loginStatus.subscribe(status => this.isLoggedIn = status);
  }

}
