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
import { TranslateService } from '@ngx-translate/core';

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
  private toastrMessages;

  constructor(
    private auth: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.translateService.get('TOASTR').subscribe(response => {
      this.toastrMessages = response;
    });

    this.auth
      .authStateTrack()
      .then(
        response => {
          this.isLoggedIn = response.logged;
        },
        errRes => {
          this.toastrService.error(
            errRes.message,
            this.toastrMessages.ERROR_TITLE
          );
        }
      )
      .catch(errorRes => {
        this.toastrService.error(
          errorRes.message,
          this.toastrMessages.ERROR_TITLE
        );
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
    this.auth.showHTTPLoader(true);
    this.auth
      .signUp(
        this.registerForm.value.registerEmail,
        this.registerForm.value.registerPassword
      )
      .then(response => {
        this.closeModal();
        this.auth.showHTTPLoader(false);
      })
      .catch(error => {
        this.auth.showHTTPLoader(false);
        this.toastrService.error(
          error.message,
          this.toastrMessages.ERROR_TITLE
        );
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
    this.auth.showHTTPLoader(true);
    this.auth
      .signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then(response => {
        this.toastrService.success(
          this.toastrMessages.SUCCESFULL_LOGIN,
          this.toastrMessages.SUCCESS_TITLE
        );
        this.closeModal();
        this.auth.showHTTPLoader(false);
      })
      .catch(error => {
        this.toastrService.error(
          error.message,
          this.toastrMessages.ERROR_TITLE
        );
        this.auth.showHTTPLoader(false);
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
