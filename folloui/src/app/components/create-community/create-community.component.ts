import { CommunityService } from './../../services/community.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Community } from './../../models/community';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss']
})
export class CreateCommunityComponent implements OnInit {

  private community: Community;
  createComForm: FormGroup;
  fileToUpload: File;
  @ViewChild('labelImport')
  labelImport: ElementRef;
  constructor(private commService: CommunityService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createComForm = this.fb.group({
      communityName: [null, Validators.required],
      commDesc: [null, Validators.required]
    });
  }

  processFile(files: FileList) {
    this.fileToUpload = files.item(0);
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
  }

  addCommunity() {
    if (this.createComForm.valid) {
      this.community = new Community(this.createComForm.value);
      // Call the community service to add this community to the fav list
      this.commService.createCommunity(this.community, this.fileToUpload);
      // .toPromise().then(resp => {
      //   if (resp.status === 200) {
      //     this.router.navigate(['']);
      //   }
      // });
    }
  }
}
