import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
}
