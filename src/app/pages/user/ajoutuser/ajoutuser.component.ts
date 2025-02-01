import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { SyncvoteService } from 'src/app/services/syncvote.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './ajoutuser.component.html',
})
export class AjoutUserComponent {
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private syncvoteService: SyncvoteService, private tokenService: TokenService) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      const token = this.tokenService.getToken();
      if (token) {
        this.syncvoteService.addPost(userData, token).subscribe(
          (response: any) => {
            console.log('User added successfully:', response);
          },
          (error: any) => {
            console.error('Error adding user:', error);
          }
        );
      } else {
        console.error('No token found');
      }
    }
  }
}
