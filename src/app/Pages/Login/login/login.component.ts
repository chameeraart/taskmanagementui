import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../Services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, // Inject Angular Routern,
    private api: AuthService,
    private tostr: ToastrService

  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  onSubmit() {

    const { Username, Password } = this.loginForm.value;
    console.log('Username:', Username);
    console.log('Password:', Password);

    // Check if the form is invalid
    if (this.loginForm.invalid) {
      this.tostr.error('Please fill out all  fields.');
      return;
    }

    this.api.login(this.loginForm.value).subscribe(
      result => {
        this.router.navigate(['/main']);
      },
      (error: HttpErrorResponse) => {
        this.tostr.error("Invalid Username Or Password");
      }
    );

  }
}
