import { Component, OnInit, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations]
})
export class AppComponent implements OnInit {
  title = 'TSP';
  @Input() openModal;

  shouldModalOpen = false;

  constructor() {}

  ngOnInit() {}

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
