import { Component , Input} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TablerIconsModule } from 'angular-tabler-icons';

interface cardimgs {
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
  imports: [MatCardModule, MatChipsModule, TablerIconsModule, MatButtonModule],
  templateUrl: './blog-card.component.html',
})
export class AppBlogCardsComponent {
  @Input() posts: Post[] = [];  // Receiving posts array from parent
  cardimgs: Post[] = [];         // Will hold the mapped posts data

  constructor() {}

  ngOnInit(): void {
    this.cardimgs = this.posts.map(post => ({
      ...post,
      title: post.title,
      user:'/assets/images/profile/user-1.jpg',
      imgSrc: '/assets/images/blog/blog-img2.jpg'
    }));
  }
}
