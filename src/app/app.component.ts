import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './shared/animations';
import { AuthService } from './shared/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { startWith, delay } from 'rxjs/operators';
import { SharedService } from './shared/shared.service';
import { Subscription } from 'rxjs';
import * as AOS from 'aos';
import { trigger, transition, style, animate } from '@angular/animations';
import { ThemeService } from './theme/theme.service';
import { Review } from './components/reviews/review-element/Review.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routeTransitionAnimations,
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TSP';
  public pendingHttpRequest = false;
  private subscription: Subscription;
  public passLoggedStateInfo: boolean;
  displayTop = 0;
  shouldModalOpen = false;
  editReviewData: Review;
  editReviewId: string;
  showEditWindow = false;
  showCreateReviewWindow = false;

  constructor(
    private auth: AuthService,
    private translateService: TranslateService,
    private sharedService: SharedService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    window.addEventListener('scroll', this.scrollEvent, true);
    this.themeService.setActiveTheme(this.themeService.getLocalStorageTheme());
    AOS.init({
      once: true,
      duration: 1200
    });
    this.subscription = this.sharedService.publishLoginModalState.subscribe(
      response => {
        this.shouldModalOpen = response;
      }
    );
    this.auth.afAuth.user.subscribe(res => {
      if (res) {
        this.passLoggedStateInfo = true;
      } else {
        this.passLoggedStateInfo = false;
      }
    });
    this.auth.triggerLoadingScreen
      .pipe(startWith(null), delay(0))
      .subscribe(response => {
        this.pendingHttpRequest = response;
      });
    this.translateService.setDefaultLang('English');

    if (!localStorage.language) {
      localStorage.setItem('language', 'English');
    }
    this.translateService.use(localStorage.language);

    this.sharedService.editWindowSubject.subscribe(res => {
      if (res === true) {
        this.sharedService.editWindowData.subscribe(response => {
          if (response !== null) {
            this.editReviewData = response[0];
            this.editReviewId = response[1];
            this.showEditWindow = true;
          }
        });
      } else {
        this.editReviewData = null;
        this.showEditWindow = false;
      }
    });

    this.sharedService.createReviewWindow.subscribe(res => {
      this.showCreateReviewWindow = res;
    });
  }

  prepareRoute(outlet: RouterOutlet): boolean {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData.animationState
    );
  }

  checkIfFirstTimeUser() {
    if (!localStorage.getItem('firstTime')) {
      return true;
    } else {
      return false;
    }
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  onActivate(event) {
    this.scrollToTop();
  }

  scrollEvent = (event: any): void => {
    this.displayTop = event.currentTarget.pageYOffset;
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
    window.removeEventListener('scroll', this.scrollEvent, true);
  }
}
