import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MaterialModule } from '../material/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ClickOutsideModule } from 'ng-click-outside';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    MaterialModule,
    CarouselModule,
    ClickOutsideModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    CommonModule,
    NgbModule,
    TranslateModule,
    MaterialModule,
    ClickOutsideModule
  ]
})
export class SharedModule {}
