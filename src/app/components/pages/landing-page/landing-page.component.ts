import { AuthService } from './../../../shared/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const eMail = '';
    const passWord = '';
    this.registerForm = new FormGroup({
      registerEmail: new FormControl(eMail, Validators.email),
      registerPassword: new FormControl(passWord, Validators.required)
    });
  }
  onRegisterFormSubmit() {
    const formValue = this.registerForm.value;
    this.auth
      .signUp(formValue.registerEmail, formValue.registerPassword)
      .then(res => {
        this.ngOnDestroy();
      });
  }

  ngOnDestroy() {
    localStorage.setItem('firstTime', 'false');
  }
}
