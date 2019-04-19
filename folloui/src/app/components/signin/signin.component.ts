import { AppState } from './../../app.state';
import { LoginService } from './../../services/login.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Login } from '../../models/login.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { HttpClient } from  "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import * as LoginActions from './../../actions/login.actions';
import * as TokenActions from './../../token-store/actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginData: Login;
  loginForm: FormGroup;
  private formSubmitAttempt: boolean;
  private isInvalidCred: boolean;
  errorMsg: string;
  constructor(private ls: LoginService, private fb: FormBuilder, private location: Location, private store: Store<any>, private http: HttpClient) { }

  reset() {
    this.formSubmitAttempt = false;
    this.isInvalidCred = false;
    this.loginForm.reset();
    this.location.back();
  }

  ngOnInit() {
    this.isInvalidCred = false;
    this.formSubmitAttempt = false;
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
      password: [null, Validators.required],
    });
    console.log('INSIDE LOGIN');
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.loginForm.valid) {
      this.loginData = new Login(this.loginForm.value);
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      
      
      //contonue from here
      this.http.post('http://localhost:3000/login/', {username: this.loginData.username, password: this.loginData.password}, httpOptions)
      .subscribe((data) =>{
        
      })
      this.store.dispatch(new LoginActions.LoggedInStatus(true));
      this.isInvalidCred = false;
      this.reset();
      // this.ls.doLogin(this.loginData).toPromise().then(res => {
      //   if (res.status === 200) {
      //     this.store.dispatch(new LoginActions.LoggedInStatus(true));
      //     this.isInvalidCred = false;
      //     this.reset();
      //   } else {
      //     // Show error on UI
      //     this.isInvalidCred = true;
      //     this.errorMsg = res.statusText;
      //   }
      // });
    }
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }

  isFieldValid(field: string) {
    return (((!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)) || this.isInvalidCred);
  }

  customErrorMsg(field: string) {
    if (field === 'username') {
      if (this.loginForm.get(field).hasError('required') ||
        this.loginForm.get(field).hasError('minlength')
        || this.loginForm.get(field).hasError('maxlength')) {
        return 'Username must be between 3 and 20 characters';
      } else {
        return this.errorMsg;
      }
    }
    if (field === 'password') {
      if (this.loginForm.get(field).hasError('required')) {
        return 'Please enter password';
      } else {
        return '';
      }
    }
  }
}
