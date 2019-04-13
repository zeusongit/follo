import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
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
  constructor(private ls: LoginService, private fb: FormBuilder) { }

  ngOnInit() {
    this.isInvalidCred = false;
    this.formSubmitAttempt = false;
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
      password: [null, Validators.required],
    });
  }

  onSubmit() {

    this.formSubmitAttempt = true;
    if (this.loginForm.valid) {
      this.loginData = new Login(this.loginForm.value);
      // console.log(JSON.stringify(this.loginData));
      this.ls.loginService(this.loginData);
      this.isInvalidCred = true;
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
      if (!this.isInvalidCred) {
        return 'Username must be between 3 and 20 characters';
      } else {
        return 'Incorrect username or password';
      }
    }
    if (field === 'password') {
      if (!this.isInvalidCred) {
        return 'Please enter password';
      } else {
        this.loginForm.get(field).reset();
        return '';
      }
    }
  }
}
