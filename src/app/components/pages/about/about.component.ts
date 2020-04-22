import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public teamMemberText: string;
  public teamMemberTitle: string;
  public showInfo = false;
  constructor() {}

  ngOnInit(): void {}

  toggleInfo() {}
}
