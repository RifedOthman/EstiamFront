import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncvoteService {

  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  // POSTS 

  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/allposts`);
  }

  addPost(postData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}/posts`, postData);
  }

  getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/${id}`);
  }

  updatePost(id: number, postData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/posts/${id}`, postData);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/posts/${id}`);
  }

  getAllPostsByUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${userId}/posts`);
  }

  getPostsByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts?category=${category}`);
  }

  upDownVotePost(id: number, voteData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/posts/${id}/vote`, voteData);
  }

  searchPosts(query: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search/posts?query=${query}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categories`);
  }

  // COMMENTS 

  getComments(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/comments`);
  }

  addCommentToPost(postId: number, commentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/posts/${postId}/comments`, commentData);
  }

  getAllCommentsForPost(postId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/${postId}/comments`);
  }

  getCommentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/comments/${id}`);
  }

  updateComment(id: number, commentData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/comments/${id}`, commentData);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/comments/${id}`);
  }

  upDownVoteComment(id: number, voteData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/comments/${id}/vote`, voteData);
  }

  getTopCommentsForPost(postId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/${postId}/comments/top`);
  }

  searchComments(query: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search/comments?query=${query}`);
  }
}
