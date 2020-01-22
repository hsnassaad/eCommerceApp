import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  editForm: FormGroup;

  constructor(private userService: UserService,
              private authService: AuthService,
              private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.buildForm();
  }


  buildForm() {
    this.editForm = this.fb.group({
      firstName: [this.authService.currentUser.firstName, Validators.required],
      lastName: [this.authService.currentUser.lastName, Validators.required],
      phoneNumber: [this.authService.currentUser.phoneNumber],
      gender: [this.authService.currentUser.gender, Validators.required],
      newPassword: [''],
      confirmPassword: [''],
    });
  }

  updatedUser() {
    this.userService.updatedUser(this.editForm.value, this.authService.currentUser.id).subscribe(() => {
      this.authService.currentUser.firstName = this.editForm.value.firstName;
      this.authService.currentUser.lastName = this.editForm.value.lastName;
      this.authService.currentUser.phoneNumber = this.editForm.value.phoneNumber;
      this.authService.currentUser.gender = this.editForm.value.gender;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      this.editForm.reset(this.authService.currentUser);
    });
  }

}
