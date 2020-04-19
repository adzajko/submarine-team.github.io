import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  toggleInfo(id: number) {
    document.querySelectorAll('.section').forEach(element => {
      element.classList.remove('h-100');
    });
    if (document.getElementById(`p${id}`).classList.contains('h-100')) {
      document.getElementById(`p${id}`).classList.remove('h-100');
      return;
    }
    document.getElementById(`p${id}`).classList.toggle('h-100');
  }
}
