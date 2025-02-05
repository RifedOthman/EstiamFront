import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenKey = 'token';

  // Sauvegarde du token dans le localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Récupération du token du localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Suppression du token du localStorage
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Vérifie si l'utilisateur est connecté (si le token est présent)
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Récupère l'ID de l'utilisateur depuis le token
  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        // Décodage du token pour obtenir les informations d'utilisateur
        const decoded: any = jwtDecode(token);
        return decoded.id || null;  // Retourne l'ID de l'utilisateur si présent
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return decoded.role === 'admin'; 
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }
    return false;
  }
}
