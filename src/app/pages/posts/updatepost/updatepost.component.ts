import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SyncvoteService } from 'src/app/services/syncvote.service';
import { TokenService } from 'src/app/services/token.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';

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
  templateUrl: './updatepost.component.html',
})
export class updatePostComponent implements OnInit {
  postForm: FormGroup;
  postId: string = ''; // Store post ID

  constructor(
    private fb: FormBuilder,
    private syncvoteService: SyncvoteService,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categories: ['', Validators.required], 
    });
  }

  ngOnInit(): void {
    // Get post ID from URL
    this.route.queryParams.subscribe((params:any) => {
      if (params['id']) {
        this.postId = params['id'];
        this.loadPostData(this.postId);
      }
    });
  }

  loadPostData(id: string) {
    this.syncvoteService.getPostById(id).subscribe(
      (response: any) => {
        if (response && response.data) {
          const post = response.data;
          this.postForm.patchValue({
            title: post.title,
            description: post.description,
            categories: post.categories.join(', '), // Convert array to string
          });
        }
      },
      (error: any) => {
        console.error('Error fetching post:', error);
      }
    );
  }
  submitForm() {
    if (this.postForm.valid) {
      const postData = {
        ...this.postForm.value,
        categories: Array.isArray(this.postForm.value.categories)
        ? this.postForm.value.categories
        : [this.postForm.value.categories]// 
       
      };

      const token = this.tokenService.getToken();
      if (token) {
        this.syncvoteService.updatePost(this.postId,postData).subscribe(
          (response: any) => {
            console.log('Post updated successfully:', response);
          },
          (error: any) => {
            console.error('Error updating post:', error);
          }
        );
      } else {
        console.error('No token found');
      }
    }
  }
}
