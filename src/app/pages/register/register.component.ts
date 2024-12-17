import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

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
