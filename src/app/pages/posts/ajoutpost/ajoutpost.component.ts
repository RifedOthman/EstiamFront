import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SyncvoteService } from 'src/app/services/syncvote.service';
import { TokenService } from 'src/app/services/token.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';  // Import MatSelectModule

@Component({
  selector: 'app-ajoutpost',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,  // Add MatSelectModule
  ],
  templateUrl: './ajoutpost.component.html',
})
export class AjoutPostComponent {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private syncvoteService: SyncvoteService,
    private tokenService: TokenService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categories: ['', Validators.required], // Correctly manage categories
    });
  }

  submitForm() {
    if (this.postForm.valid) {
      const userId = this.tokenService.getUserId();
      console.log("User ID:", userId);

      const postData = {
        ...this.postForm.value,
        categories: Array.isArray(this.postForm.value.categories)
          ? this.postForm.value.categories
          : [this.postForm.value.categories],  // Ensure categories is an array
        createdAt: new Date(),
        createdBy: userId,
      };

      const token = this.tokenService.getToken();
      if (token) {
        console.log(token);
        this.syncvoteService.addPost(postData, token).subscribe(
          (response: any) => {
            console.log('Post added successfully:', response);
          },
          (error: any) => {
            console.error('Error adding post:', error);
          }
        );
      } else {
        console.error('No token found');
      }
      console.log(postData);
    } else {
      console.error('Form is invalid');
    }
  }
}
