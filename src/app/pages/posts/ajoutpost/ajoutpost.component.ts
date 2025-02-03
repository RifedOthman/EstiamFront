import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SyncvoteService } from 'src/app/services/syncvote.service';
import { TokenService } from 'src/app/services/token.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

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
  ],
  templateUrl: './ajoutpost.component.html',
})
export class AjoutPostComponent {
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private syncvoteService: SyncvoteService, private tokenService: TokenService) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categories: ['', Validators.required], // User can enter any category
    });
  }

  submitForm() {
    if (this.postForm.valid) {
      const postData = {
        ...this.postForm.value,
        categories: Array.isArray(this.postForm.value.categories)
        ? this.postForm.value.categories
        : [this.postForm.value.categories], // 
        createdAt: new Date(),
        createdBy: 'user123', // Replace with actual user ID from auth
      };

      const token = this.tokenService.getToken();
      if (token) {
        console.log(token)
        this.syncvoteService.addPost(postData,token).subscribe(
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
    }
  }
}
