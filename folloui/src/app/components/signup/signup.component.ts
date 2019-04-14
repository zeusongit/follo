import { Component, OnInit } from '@angular/core';
import { SignupService } from './../../services/signup.service';
import { Signup } from '../../models/signup.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MustMatch } from '../../_helpers/must-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupData: Signup;
  signupForm: FormGroup;
  private formSubmitAttempt: boolean;
  private isInvalidCred: boolean;
  constructor(private ss: SignupService, private fb: FormBuilder) { }

  openModel() {
    console.log('INSIDE MODAL');
    this.formSubmitAttempt = false;
    this.isInvalidCred = false;
    this.signupForm.reset();
  }

  ngOnInit() {

    this.isInvalidCred = false;
    this.formSubmitAttempt = false;
    this.signupForm = this.fb.group({
      username: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.maxLength(60), Validators.minLength(6)]],
      cpassword: [null, [Validators.required, Validators.maxLength(60), Validators.minLength(6)]],
      firstname: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      lastname: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      email: [null, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]
    }, {
      validator: MustMatch('password', 'cpassword')
  });
  }
  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.signupForm.valid) {
      this.signupData = new Signup(this.signupForm.value);
      // console.log(JSON.stringify(this.SignupData));
      this.ss.signupService(this.signupData);
      this.isInvalidCred = true;
    }
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }

  isFieldValid(field: string) {
    return (((!this.signupForm.get(field).valid && this.signupForm.get(field).touched) ||
      (this.signupForm.get(field).untouched && this.formSubmitAttempt)) || this.isInvalidCred);
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
        this.signupForm.get(field).reset();
        return '';
      }
    }
    if (field === 'email') {
      if (!this.isInvalidCred) {
        return 'Please enter valid email';
      } else {
        this.signupForm.get(field).reset();
        return '';
      }
    }
    if (field === 'firstname') {
      if (!this.isInvalidCred) {
        return 'Please enter firstname';
      } else {
        this.signupForm.get(field).reset();
        return '';
      }
    }
    if (field === 'lastname') {
      if (!this.isInvalidCred) {
        return 'Please enter lastname';
      } else {
        this.signupForm.get(field).reset();
        return '';
      }
    }
    if (field === 'cpassword') {
      if (!this.isInvalidCred) {
        return 'Please confirm password';
      } else {
        this.signupForm.get(field).reset();
        return '';
      }
    }
  }

}
