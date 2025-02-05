import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SyncvoteService } from 'src/app/services/syncvote.service';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-updatepost',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './updatepost.component.html',
})
export class UpdatePostComponent implements OnInit {
  postForm: FormGroup;
  postId: string;

  constructor(
    private fb: FormBuilder,
    private syncvoteService: SyncvoteService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categories: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
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

  loadPost(): void {
    // Fetch the post details using the service
    this.syncvoteService.getPostById(this.postId).subscribe(
      (post: any) => {
        // Once the post is fetched, pre-fill the form with its data
        this.postForm.patchValue({
          title: post.title,
          description: post.description,
          categories: post.categories,
        });
      },
      (error) => {
        console.error('Error loading post:', error);
      }
    );
  }

  submitForm() {
    if (this.postForm.valid) {
      const userId = this.tokenService.getUserId();
      console.log("User ID:", userId);

      const updatedPostData = {
        ...this.postForm.value,
        categories: Array.isArray(this.postForm.value.categories)
          ? this.postForm.value.categories
          : [this.postForm.value.categories],
        updatedAt: new Date(),
        updatedBy: userId,
      };

      const token = this.tokenService.getToken();
      if (token) {
        this.syncvoteService.updatePost(this.postId, updatedPostData, token).subscribe(
          (response: any) => {
            console.log('Post updated successfully:', response);
            this.router.navigate(['/posts']);  // Navigate to the posts list after update
          },
          (error: any) => {
            console.error('Error updating post:', error);
          }
        );
      } else {
        console.error('No token found');
      }
      console.log(updatedPostData);
    }
  }
  
  cancel(): void {
    this.router.navigate(['/posts']);
  }
}
