import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationStart } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('logiRegi') logiRegi: ElementRef;
  loginForm: FormGroup;
  registerForm: FormGroup;
  @Input() isLoggedIn = false;
  private toastrMessages;
  public showDialog = false;

  constructor(
    private auth: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private translateService: TranslateService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.translateService.get('TOASTR').subscribe(response => {
      this.toastrMessages = response;
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
        this.sharedService.emitLoginModalState(false);
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
  forgetPasswordModal() {
    this.showDialog = true;
  }

  forgotPasswordDialog(form: NgForm) {
    const email: any = Object.values(form.form.value)[0];
    this.auth.showHTTPLoader(true);
    this.auth.afAuth
      .sendPasswordResetEmail(email)
      .then(res => {
        this.auth.showHTTPLoader(false);
        this.toastrService.success(
          this.toastrMessages.PASS_RESET,
          this.toastrMessages.SUCCESS_TITLE
        );
        this.showDialog = false;
      })
      .catch(errorRes => {
        this.auth.showHTTPLoader(false);
        this.toastrService.error(
          errorRes.message,
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
        this.sharedService.emitLoginModalState(false);
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
    this.afAuth
      .signOut()
      .then(response => {
        this.sharedService.emitLoginModalState(false);
        this.router.navigate(['/']);
        this.translateService.get('TOASTR').subscribe(res => {
          this.toastrService.success(res.SIGNED_OUT, res.SUCCESS_TITLE);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  closeModal() {
    this.sharedService.emitLoginModalState(false);
  }
}
