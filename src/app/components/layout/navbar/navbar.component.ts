import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}

  toggleOverlay() {
    this.subLogo.nativeElement.classList.toggle('v-none');
    this.navBrand.nativeElement.classList.toggle('brand-fixed');
    this.hamTop.nativeElement.classList.toggle('open');
    this.hamBot.nativeElement.classList.toggle('open');
    this.overlay.nativeElement.classList.toggle('h-100');
  }
}
