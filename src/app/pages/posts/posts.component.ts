import { Component, OnInit } from '@angular/core';
import { SyncvoteService } from '../../services/syncvote.service';
import { CommonModule } from '@angular/common';
import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-posts',
  standalone: true,
  templateUrl: './posts.component.html',
  imports: [
    CommonModule, 
    AppBlogCardsComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CdkScrollable,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule, 
    MatCardModule,
    MatPaginatorModule,
    MatInputModule, 
    MatCheckboxModule 
  ],
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];          // posts from API
  filteredPosts: any[] = [];  //  filtered posts
  searchQuery: string = '';   // search input

  loading: boolean = true;
  error: string = '';
  
  constructor(private syncvoteService: SyncvoteService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  
  getPosts(): void {
    this.syncvoteService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.data;  //Save fetched posts
        this.filteredPosts = [...this.posts];  // show all posts
        this.loading = false;
      },
      error: () => {
        this.error = 'Échec de la récupération des posts !';
        this.loading = false;
      }
    });
  }

  filterPosts(): void {
    this.loading = true;
    this.syncvoteService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.data; 

        this.filteredPosts = this.posts.filter(post =>
          post.title?.toLowerCase().trim().includes(this.searchQuery.toLowerCase().trim())
        );
        console.log("Filtered Posts:", this.filteredPosts);  
        this.loading = false;  
      },
      error: () => {
        this.error = 'Échec de la récupération des posts !';
        this.loading = false;
      }
    });
  }

  
}
