import { Component, OnInit } from '@angular/core';
import { SyncvoteService } from '../../services/syncvote.service';
import { CommonModule } from '@angular/common';
import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';



@Component({
  selector: 'app-posts',
  standalone: true,
  templateUrl: './posts.component.html',
  imports: [CommonModule, 
    AppBlogCardsComponent],
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private syncvoteService: SyncvoteService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.syncvoteService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.data;
        this.loading = false;
        console.log("connectéééé")
      },
      error: (err) => {
        this.error = 'Échec de la récupération des posts !';
        this.loading = false;
      }
    });
  }
  
}
