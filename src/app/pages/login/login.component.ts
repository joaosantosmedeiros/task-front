import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form!: FormGroup;

  constructor() {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      login: new FormControl({value: '', disabled: false}, [Validators.required]),
      password: new FormControl({value: '', disabled: false}, [Validators.required]),
    })
  }

  get login() {
    return this.form.get('login')!;
  }

  get password() {
    return this.form.get('password')!;
  }

}
