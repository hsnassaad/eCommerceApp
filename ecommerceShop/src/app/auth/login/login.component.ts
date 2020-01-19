import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private fb: FormBuilder, private router: Router) { }

  showError = false;
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  ngOnInit() {
    this.buildForm();
  }


  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.loading = true;
    this.authService.signIn(this.loginForm.value).subscribe((response) => {
      this.showError = false;
      this.loading = false;
      this.router.navigate(['main/products']);
    }, error => {
      this.showError = true;
      this.loading = false;
      this.errorMessage = error;
    });

  }
}
