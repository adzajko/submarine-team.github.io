import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('logiRegi') logiRegi: ElementRef;
  @Output() clMod = new EventEmitter();
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoggedIn = false;

  constructor(
    private auth: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth
      .authStateTrack()
      .then(
        response => {
          this.isLoggedIn = response.logged;
        },
        errRes => {
          this.toastrService.error(errRes.message, 'Error.');
        }
      )
      .catch(errorRes => {
        this.toastrService.error(errorRes.message, 'Error.');
      });
    this.initLoginForm();
    this.initRegisterForm();

    this.router.events.subscribe(eventChange => {
      if (eventChange instanceof NavigationStart) {
        this.closeModal();
      }
    });
  }

  initRegisterForm() {
    const eMail = '';
    const passWord = '';
    this.registerForm = new FormGroup({
      registerEmail: new FormControl(eMail, Validators.email),
      registerPassword: new FormControl(passWord, Validators.required)
    });
  }

  onRegisterFormSubmit() {
    this.auth
      .signUp(
        this.registerForm.value.registerEmail,
        this.registerForm.value.registerPassword
      ).then(response => {
        this.closeModal();
      })
      .catch(error => {
        this.toastrService.error(error.message, 'An error has occurred.');
      });

  }

  initLoginForm() {
    const eMail = '';
    const passWord = '';
    this.loginForm = new FormGroup({
      email: new FormControl(eMail, Validators.email),
      password: new FormControl(passWord, Validators.required)
    });
  }

  onLoginFormSubmit() {
    this.auth
      .signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then(response => {
        this.toastrService.success('You have been logged in.', 'Success!');
        this.closeModal();
      })
      .catch(error => {
        this.toastrService.error(error.message, 'An error has occurred.');
      });

  }

  triggerLogin() {
    this.logiRegi.nativeElement.classList.remove('panel-active');
  }

  triggerRegister() {
    this.logiRegi.nativeElement.classList.add('panel-active');
  }

  logOut() {
    this.auth.signOut();
    this.clMod.emit(false);
  }

  closeModal() {
    this.clMod.emit(false);
  }
}
