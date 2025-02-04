import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { SyncvoteService } from 'src/app/services/syncvote.service';
import { TokenService } from 'src/app/services/token.service';
import { CommonModule } from '@angular/common';  // Import CommonModule

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
  imports: [MatCardModule, MatChipsModule, TablerIconsModule, MatButtonModule, CommonModule], // Add CommonModule here
  templateUrl: './blog-card.component.html',
})
export class AppBlogCardsComponent {
  @Input() posts: Post[] = [];  
  cardimgs: Post[] = [];         

  constructor(
    private syncvoteService: SyncvoteService,  
    private tokenService: TokenService,
    private router: Router      
  ) {}

  ngOnInit(): void {
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
    const token = this.tokenService.getToken(); // Get the token from TokenService

    if (!token) {
      console.error('User is not authenticated!');
      return;
    }

    // Call the deletePost method from SyncvoteService with the token and post ID
    this.syncvoteService.deletePost(cardimg.id, token).subscribe(
      (response) => {
        // If delete is successful, remove from the local arrays
        console.log('Post deleted from server:', response);

        // Remove from cardimgs array
        const cardimgIndex = this.cardimgs.indexOf(cardimg);
        if (cardimgIndex !== -1) {
          this.cardimgs.splice(cardimgIndex, 1);
        }

        // Remove from posts array (if needed)
        const postIndex = this.posts.findIndex(post => post.id === cardimg.id);
        if (postIndex !== -1) {
          this.posts.splice(postIndex, 1);
        }
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }
}
