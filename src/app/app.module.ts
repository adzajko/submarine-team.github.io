import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { ContactComponent } from './components/pages/contact/contact.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
// <Firebase Imports>
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// </Firebase Imports>
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewElementComponent } from './components/reviews/review-element/review-element.component';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { CompaniesComponent } from './components/pages/companies/companies.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminPanelComponent } from './components/pages/admin-panel/admin-panel.component';
import { HttpLoaderComponent } from './shared/http-loader/http-loader.component';
import { TermsOfServiceComponent } from './components/pages/terms-of-service/terms-of-service.component';
import { VotesContainerComponent } from './components/reviews/votes-container/votes-container.component';
import { FourOhFourComponent } from './components/pages/four-oh-four/four-oh-four.component';
import { FullListComponent } from './components/reviews/full-list/full-list.component';
import { ReviewFullComponent } from './components/reviews/review-full/review-full.component';
import { ComponentListItemComponent } from './shared/component-list-item/component-list-item.component';

import { ClickOutsideModule } from 'ng-click-outside';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    ContactComponent,
    LoginComponent,
    ReviewElementComponent,
    MyAccountComponent,
    CompaniesComponent,
    AdminPanelComponent,
    HttpLoaderComponent,
    TermsOfServiceComponent,
    VotesContainerComponent,
    FourOhFourComponent,
    FullListComponent,
    ReviewFullComponent,
    ComponentListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    LayoutModule,
    NgbModule,
    ClickOutsideModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
