import { Component, OnInit, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './shared/animations';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations]
})
export class AppComponent implements OnInit {
  title = 'TSP';
  @Input() openModal;
  pendingHttpRequest = false;

  shouldModalOpen = false;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.triggerLoadingScreen.subscribe(response => {
      this.pendingHttpRequest = response;
    });
  }

  openModalFunction(event) {
    this.shouldModalOpen = event;
  }

  closeModal(event) {
    this.shouldModalOpen = event;
  }

  prepareRoute(outlet: RouterOutlet): boolean {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }
}
