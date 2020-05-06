import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-component-list-item',
  templateUrl: './component-list-item.component.html',
  styleUrls: ['./component-list-item.component.scss'],
})
export class ComponentListItemComponent implements OnInit {
  @Input() ComponentListItem: any;
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}
}
