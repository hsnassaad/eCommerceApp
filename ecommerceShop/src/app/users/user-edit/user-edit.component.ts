import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {


  matcher = new CrossFieldErrorMatcher();
  editForm: FormGroup;
  passwordForm: FormGroup;

  @HostListener('window: beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

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
      gender: [this.authService.currentUser.gender, Validators.required]
    });

    this.passwordForm = this.fb.group({
      newPassword: [''],
      confirmPassword: [''],
    }, {validator: this.checkPasswords });
  }

  updatedUser() {
    if (this.editForm.dirty) {
    this.userService.updatedUser(this.editForm.value, this.authService.currentUser.id).subscribe(() => {
      this.authService.currentUser.firstName = this.editForm.value.firstName;
      this.authService.currentUser.lastName = this.editForm.value.lastName;
      this.authService.currentUser.phoneNumber = this.editForm.value.phoneNumber;
      this.authService.currentUser.gender = this.editForm.value.gender;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      this.editForm.reset(this.authService.currentUser);
    }, error => {
      console.log(error);
    });
  }
    if (this.passwordForm.value.newPassword !== '') {
      this.userService.changePassword(this.passwordForm.value.newPassword).subscribe(() => {
        this.passwordForm.reset();
      }, error => {
        console.log(error);
      });
    }

  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('newPassword').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { mismatch: true };
  }


}

export class CrossFieldErrorMatcher  implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.hasError('mismatch');
  }
}
