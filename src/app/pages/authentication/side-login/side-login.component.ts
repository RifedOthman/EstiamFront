import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private TokenService: TokenService, private router: Router) {}

  login(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        const token = response.data.token;

        console.log(response); 
        // On suppose que le token est dans la réponse sous la forme response.token
        this.TokenService.setToken(response.data.token);  // Enregistrer le token dans localStorage 
        // Ensuite, on redirige vers la page des posts
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        // Si l'authentification échoue, on affiche un message d'erreur
        this.errorMessage = error.error.message || 'Login failed';
      },
    });
  }

  
}
