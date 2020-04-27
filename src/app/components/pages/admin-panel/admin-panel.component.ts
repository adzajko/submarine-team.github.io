import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../shared/review.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  reviewBatch: any;
  dailyData: number[];
  chart = [];
  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {}
}
