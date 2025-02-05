import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SyncvoteService } from 'src/app/services/syncvote.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TablerIconsModule } from 'angular-tabler-icons';

interface Post {
  id: number;
  title: string;
  createdBy: string;
  user: string;
  imgSrc: string;
  createdAt: string;
  category: string;
}

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, TablerIconsModule, CommonModule],
  templateUrl: './blog-card.component.html',
})
export class AppBlogCardsComponent implements OnInit {
  @Input() posts: Post[] = [];
  cardimgs: Post[] = [];
  currentUserId: string | null = '';  // ID de l'utilisateur connecté (doit être une chaîne de caractères)
  isAdmin: boolean = false;  // Vérification si l'utilisateur est admin

  constructor(
    private syncvoteService: SyncvoteService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtenez l'ID de l'utilisateur connecté et vérifiez s'il est admin
    this.currentUserId = this.tokenService.getUserId();
    this.isAdmin = this.tokenService.isAdmin();  // Vérifier si l'utilisateur est admin

    this.cardimgs = this.posts.map(post => ({
      ...post,
      title: post.title,
      user: '/assets/images/profile/user-1.jpg',
      imgSrc: '/assets/images/blog/blog-img2.jpg'
    }));
  }

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
    this.router.navigate(['/posts/updatepost'], { queryParams: { id: cardimg.id } });
  }

  onDelete(cardimg: Post): void {
    const token = this.tokenService.getToken();
    if (!token) {
      console.error('User is not authenticated!');
      return;
    }

    this.syncvoteService.deletePost(cardimg.id, token).subscribe(
      response => {
        // Suppression réussie
        console.log('Post deleted from server:', response);
        const index = this.cardimgs.indexOf(cardimg);
        if (index !== -1) {
          this.cardimgs.splice(index, 1);
        }
      },
      error => {
        console.error('Error deleting post:', error);
      }
    );
  }

  canEditOrDelete(post: Post): boolean {
    // L'admin peut modifier et supprimer tous les posts
    if (this.isAdmin) {
      return true;
    }

    return post.createdBy === this.currentUserId;
  }
}
