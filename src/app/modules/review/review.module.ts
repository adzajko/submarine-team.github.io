import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewElementComponent } from 'src/app/components/reviews/review-element/review-element.component';
import { ReviewFullComponent } from 'src/app/components/reviews/review-full/review-full.component';
import { VotesContainerComponent } from 'src/app/components/reviews/votes-container/votes-container.component';
import { FullListComponent } from 'src/app/components/reviews/full-list/full-list.component';
import { ReviewRoutingModule } from './review-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReviewElementComponent,
    ReviewFullComponent,
    VotesContainerComponent,
    FullListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReviewRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    ReviewElementComponent,
    ReviewFullComponent,
    VotesContainerComponent,
    FullListComponent
  ]
})
export class ReviewModule {}
