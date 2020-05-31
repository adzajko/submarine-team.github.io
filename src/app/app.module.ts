import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './components/pages/contact/contact.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
// <Firebase Imports>
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// </Firebase Imports>
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './components/pages/my-account/my-account.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AdminPanelComponent } from './components/pages/admin-panel/admin-panel.component';
import { HttpLoaderComponent } from './shared/http-loader/http-loader.component';
import { TermsOfServiceComponent } from './components/pages/terms-of-service/terms-of-service.component';
import { FourOhFourComponent } from './components/pages/four-oh-four/four-oh-four.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { CompanyModule } from './modules/company/company.module';
import { ReviewModule } from './modules/review/review.module';
import { SharedModule } from './modules/shared/shared.module';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    ContactComponent,
    LoginComponent,
    MyAccountComponent,
    AdminPanelComponent,
    HttpLoaderComponent,
    TermsOfServiceComponent,
    FourOhFourComponent,
    LandingPageComponent,
  ],
  imports: [
    SharedModule,
    CompanyModule,
    ReviewModule,
    ScrollingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    LayoutModule,
    ClickOutsideModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
