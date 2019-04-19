import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SignupService } from './../../services/signup.service';
import { Signup } from '../../models/signup.model';
import { FormBuilder, FormGroup, ControlContainer } from '@angular/forms';
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
  constructor(private ss: SignupService, private fb: FormBuilder, private location: Location) { }

  reset() {
    console.log('INSIDE MODAL');
    this.formSubmitAttempt = false;
    this.isInvalidCred = false;
    this.signupForm.reset();
  }

  closeModal() {
    this.location.back();
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
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
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
      if (this.signupForm.get(field).hasError('required') ||
        this.signupForm.get(field).hasError('minlength')
        || this.signupForm.get(field).hasError('maxlength')) {
        return 'Username must be between 3 and 20 characters';
      } else {
        return 'Incorrect username or password';
      }
    }
    if (field === 'password') {
      if (this.signupForm.get(field).hasError('required') ||
        this.signupForm.get(field).hasError('minlength')
        || this.signupForm.get(field).hasError('maxlength')) {
        return 'Password must be between 6 and 60 characters';
      } else {
        return '';
      }
    }
    if (field === 'email') {
      console.log(this.signupForm.get(field).hasError('pattern'));
      if (this.signupForm.get(field).hasError('required')) {
        return 'Please enter email';
      } else if (this.signupForm.get(field).hasError('pattern')) {
        return 'Please enter valid email';
      } else {
        return '';
      }
    }
    if (field === 'firstname') {
      if (this.signupForm.get(field).hasError('required') ||
        this.signupForm.get(field).hasError('minlength')
        || this.signupForm.get(field).hasError('maxlength')) {
        return 'First name must be between 2 and 100 characters';
      } else {
        return '';
      }
    }
    if (field === 'lastname') {
      if (this.signupForm.get(field).hasError('required') ||
        this.signupForm.get(field).hasError('minlength')
        || this.signupForm.get(field).hasError('maxlength')) {
        return 'Last name must be between 2 and 100 characters';
      } else {
        return '';
      }
    }
    if (field === 'cpassword') {
      if (this.signupForm.get(field).hasError('required') ||
        this.signupForm.get(field).hasError('minlength')
        || this.signupForm.get(field).hasError('maxlength')) {
        return 'Confirm Password must be between 6 and 60 characters';
      } else if (this.signupForm.get(field).value !== this.signupForm.get('password').value) {
        return 'Passwords do not match';
      } else {
        return '';
      }
    }
  }

}
