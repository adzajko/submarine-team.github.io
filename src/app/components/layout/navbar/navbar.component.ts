import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { AuthService } from '../../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('hamTop', { static: false }) hamTop: ElementRef;
  @ViewChild('hamBot', { static: false }) hamBot: ElementRef;
  @ViewChild('navBrand', { static: false }) navBrand: ElementRef;
  @ViewChild('overlay', { static: false }) overlay: ElementRef;
  @ViewChild('subLogo', { static: false }) subLogo: ElementRef;

  // Login Logic
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: 'password',
    });
  }

  ngOnInit(): void {}

  onSubmit(loginData) {
    this.auth.signIn(loginData.email, loginData.password);
    this.loginForm.reset();
  }

  logOut() {
    this.auth.signOut();
  }

  toggleOverlay() {
    this.subLogo.nativeElement.classList.toggle('v-none');
    this.navBrand.nativeElement.classList.toggle('brand-fixed');
    this.hamTop.nativeElement.classList.toggle('open');
    this.hamBot.nativeElement.classList.toggle('open');
    this.overlay.nativeElement.classList.toggle('h-100');
  }
}
