import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../reducers/index';
import { filter, map } from 'rxjs/operators';
import { Md5 } from 'ts-md5';
import { UserFormValidators } from './user-form.validators';
import { Router } from '@angular/router';
import { signupAction } from '../app.actions';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  private validUserFormData!: any;
  stringUserData!: string;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: Store<State>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });

    this.phone?.valueChanges
      .pipe(map(() => {
        this.phone?.setErrors(UserFormValidators.phoneValidator(this.phone));
      }))
      .subscribe();

    this.password?.valueChanges
      .pipe(map(() => {
        this.password?.setErrors(UserFormValidators.passwordValidator(this.password));
      }))
      .subscribe();

    this.confirmPassword?.valueChanges
      .pipe(map(() => {
        this.confirmPassword?.setErrors(
          UserFormValidators.confirmPasswordValidator(this.confirmPassword, this.password)
        )
      }))
      .subscribe();

    this.userForm.valueChanges
      .pipe(
        filter(() => this.userForm.valid),
        map(data => {
          data.creationTimestamp = Date.now();
          data.password = Md5.hashStr(data.password);
          data.confirmPassword = Md5.hashStr(data.confirmPassword);
          return data;
        })
      )
      .subscribe(data => { this.validUserFormData = data });
  }

  onSubmit() {
    if (this.userForm.valid) {
      let currentUser: User = {
        firstname: this.validUserFormData.firstname as string,
        lastname: this.validUserFormData.lastname as string,
        email: this.validUserFormData.email as string
      }

      this.storeService.dispatch(signupAction({user: currentUser}));

      this.stringUserData = JSON.stringify(this.validUserFormData);
      console.log(this.stringUserData);

      this.router.navigateByUrl('/product/2')
    }
    else
      console.log('Boo!');
  }

  get firstname() {
    return this.userForm.get('firstname');
  }

  get email() {
    return this.userForm.get('email');
  }

  get phone() {
    return this.userForm.get('phone');
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }
}
