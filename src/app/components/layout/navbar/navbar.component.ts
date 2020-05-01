import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { AuthService } from '../../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

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
  @ViewChild('subLogo', { static: false }) subLogo: ElementRef;

  @Output() openModal = new EventEmitter();

  // Login Logic
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private translateService: TranslateService
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: 'password'
    });
  }

  ngOnInit(): void {
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
    this.subLogo.nativeElement.classList.toggle('v-none');
    this.navBrand.nativeElement.classList.toggle('brand-fixed');
    this.hamTop.nativeElement.classList.toggle('open');
    this.hamBot.nativeElement.classList.toggle('open');
    this.overlay.nativeElement.classList.toggle('h-100');
  }

  triggerModal() {
    this.openModal.emit(true);
  }

  checkMyAccount() {
    this.auth.authStateTrack().then(response => {
      if (response.logged) {
        this.toggleOverlay();
      } else {
        this.triggerModal();
        this.toggleOverlay();
      }
    });
  }

  changeLanguage(value) {
    localStorage.setItem('language', value);
    this.translateService.use(value);
  }
}
