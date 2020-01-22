import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  matcher = new CrossFieldErrorMatcher();
  user: User;
  loading = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar
              ) { }

  ngOnInit() {
    this.buildForm();
  }

  checkPasswords(group: FormGroup) {
  const pass = group.get('password').value;
  const confirmPass = group.get('confirmPassword').value;
  return pass === confirmPass ? null : { mismatch: true };
}



  buildForm() {
    this.registerForm = this.fb.group({
      gender: ['male', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: [''],
    }, {validator: this.checkPasswords });
  }

  register() {
    this.loading = true;
    this.user = this.registerForm.value;
    this.authService.register(this.user).subscribe(response => {
      console.table(response);
      this.router.navigate(['auth/login']);
      this.loading = false;
    }, error => {
      this.snackBar.open(error, 'cancel', {
        duration: 5000 ,
      });
      this.loading = false;
    });
  }
}

export class CrossFieldErrorMatcher  implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.hasError('mismatch');
  }
}

