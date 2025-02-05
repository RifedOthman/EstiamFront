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
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  constructor(private authService: AuthService, private router: Router) { }

  // Define the registration form
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const userData = {
      username: this.form.value.username!,
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/authentication/login']); // Redirect to login
      },
      error: (error) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      },
    });
  }
}
