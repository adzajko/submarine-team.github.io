import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SharedService } from 'src/app/shared/shared.service';
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('hamTop', { static: false }) hamTop: ElementRef;
  @ViewChild('hamBot', { static: false }) hamBot: ElementRef;
  @ViewChild('navBrand', { static: false }) navBrand: ElementRef;
  @ViewChild('overlay', { static: false }) overlay: ElementRef;
  public val: string;
  public activeTheme = false;
  public activeUser = false;

  // Login Logic
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private translateService: TranslateService,
    private afAuth: AngularFireAuth,
    private sharedService: SharedService,
    private themeService: ThemeService
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: 'password'
    });
  }

  ngOnInit(): void {
    this.themeService.emitCurrentActiveTheme.subscribe(res => {
      if (res === 'dark') {
        this.activeTheme = false;
      } else {
        this.activeTheme = true;
      }
    });
    this.afAuth.user.subscribe(res => {
      if (res) {
        this.activeUser = true;
      } else {
        this.activeUser = false;
      }
    });
    this.val = localStorage.getItem('language');
    this.translateService.addLangs(['English', 'Macedonian']);
    this.translateService.setDefaultLang('English');
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(
      browserLang.match(/English|Macedonian/) ? browserLang : 'English'
    );
  }

  onSubmit(loginData) {
    this.auth.signIn(loginData.email, loginData.password);
    this.loginForm.reset();
  }

  toggleOverlay() {
    this.hamTop.nativeElement.classList.toggle('open');
    this.hamBot.nativeElement.classList.toggle('open');
    this.overlay.nativeElement.classList.toggle('sidebar-width');
    this.overlay.nativeElement.classList.toggle('d-block');
  }

  closeOverlay() {
    this.hamTop.nativeElement.classList.remove('open');
    this.hamBot.nativeElement.classList.remove('open');
    this.overlay.nativeElement.classList.remove('sidebar-width');
  }

  triggerModal() {
    this.sharedService.emitLoginModalState(true);
  }

  checkMyAccount() {
    if (this.activeUser) {
      this.toggleOverlay();
    } else {
      this.triggerModal();
      this.toggleOverlay();
    }
  }

  changeLanguage(value) {
    localStorage.setItem('language', value);
    this.translateService.use(value);
  }

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
  }
}
