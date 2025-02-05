import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { SyncvoteService } from 'src/app/services/syncvote.service';
import { TokenService } from 'src/app/services/token.service';
import { CommonModule } from '@angular/common';

interface Post {
  id: number;
  time: string;
  imgSrc: string;
  user: string;
  title: string;
  views: string;
  category: string;
  comments: number;
  date: string;
}

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, TablerIconsModule, MatButtonModule, CommonModule], 
  templateUrl: './blog-card.component.html',
})
export class AppBlogCardsComponent implements OnChanges { 
  @Input() posts: Post[] = [];  

  cardimgs: Post[] = [];

  constructor(
    private syncvoteService: SyncvoteService,  
    private tokenService: TokenService,
    private router: Router      
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['posts'] && changes['posts'].currentValue) {
      this.updatePosts();
    }
  }

  private updatePosts(): void {
    this.cardimgs = this.posts.map(post => ({
      ...post,
      title: post.title,
      user: '/assets/images/profile/user-1.jpg',
      imgSrc: '/assets/images/blog/blog-img2.jpg'
    }));
  }

  onUpdate(cardimg: Post): void {
    console.log('Navigating to update page for post id:', cardimg.id);
    this.router.navigate(['/posts/updatepost'], { queryParams: { id: cardimg.id } });
  }

  onDelete(cardimg: Post): void {
    const token = this.tokenService.getToken(); 
    if (!token) {
      console.error('User is not authenticated!');
      return;
    }

    this.syncvoteService.deletePost(cardimg.id, token).subscribe(
      (response) => {
        console.log('Post deleted from server:', response);
        this.cardimgs = this.cardimgs.filter(post => post.id !== cardimg.id);
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }
}
