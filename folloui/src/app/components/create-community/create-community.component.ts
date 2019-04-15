import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Community } from './../../models/community';
import { Component, OnInit } from '@angular/core';
import { NavTabService } from 'src/app/services/main-content.service';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss']
})
export class CreateCommunityComponent implements OnInit {

  private community: Community;
  createComForm: FormGroup;
  constructor(private navTabService: NavTabService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createComForm = this.fb.group({
      commname: [null, Validators.required],
      commdesc: [null, Validators.required]
    });
  }

  addCommunity() {
    if (this.createComForm.valid) {
      this.community = new Community(this.createComForm.value);
      const currentComms = [this.community];
      this.navTabService.changeCommunityTab(currentComms);
      this.router.navigate(['']);
    }
  }
}
