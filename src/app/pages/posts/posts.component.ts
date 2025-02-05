import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SyncvoteService } from '../../services/syncvote.service';
import { CommonModule } from '@angular/common';
import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

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
  posts: any[] = [];
  filteredPosts: any[] = [];
  displayedPosts: any[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';  // Category filter

  loading: boolean = true;
  error: string = '';

  pageSize: number = 6;
  pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private syncvoteService: SyncvoteService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.syncvoteService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.data || [];  
        this.filteredPosts = [...this.posts];  
        this.updateDisplayedPosts();
        this.loading = false;
      },
      error: () => {
        this.error = 'Échec de la récupération des posts !';
        this.loading = false;
      }
    });
  }

  filterPosts(): void {
    // Filter by title and category
    this.filteredPosts = this.posts.filter(post => {
      const matchesTitle = post.title?.toLowerCase().trim().includes(this.searchQuery.toLowerCase().trim());
      const matchesCategory = this.selectedCategory ? post.categories?.includes(this.selectedCategory) : true;
      return matchesTitle && matchesCategory;
    });

    this.pageIndex = 0;  // Reset to the first page when filters change
    this.updateDisplayedPosts();
  }

  updateDisplayedPosts(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedPosts = this.filteredPosts.slice(startIndex, endIndex);
    this.cdr.detectChanges(); 
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedPosts();
  }
}
