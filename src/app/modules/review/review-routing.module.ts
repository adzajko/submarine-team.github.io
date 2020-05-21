import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FullListComponent } from 'src/app/components/reviews/full-list/full-list.component';
import { ReviewFullComponent } from 'src/app/components/reviews/review-full/review-full.component';

const routes = [
  {
    path: 'reviews',
    component: FullListComponent,
    children: [
      { path: ':id', component: ReviewFullComponent, outlet: 'children-router' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })
  ],
  exports: [RouterModule]
})
export class ReviewRoutingModule {}
