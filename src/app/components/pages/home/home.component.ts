import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Review } from '../../reviews/review-element/Review.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  authForm: FormGroup;
  listOfReviews: Review[] = [];

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    this.authForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
    this.listOfReviews = [
      {
        companyName: 'Telekom',
        imagePath: '/assets/submarine.png',
        numberOfStars: 2,
        textExcerpt: 'lorem ipsum ke se farbam rozov',
        timeStamp: '15 minutes ago',
        userName: '69420'
      },
      {
        companyName: 'Endava',
        imagePath: '/assets/submarine.png',
        numberOfStars: 2,
        textExcerpt: 'Bojana i pizza, untold love story',
        timeStamp: '5 minutes ago',
        userName: '69420'
      },
      {
        companyName: 'Telekom',
        imagePath: '/assets/submarine.png',
        numberOfStars: 2,
        textExcerpt: 'lorem ipsum ke se farbam rozov',
        timeStamp: '15 minutes ago',
        userName: '69420'
      },
      {
        companyName: 'Telekom',
        imagePath: '/assets/submarine.png',
        numberOfStars: 2,
        textExcerpt: 'lorem ipsum ke se farbam rozov',
        timeStamp: '15 minutes ago',
        userName: '69420'
      },
      {
        companyName: 'Telekom',
        imagePath: '/assets/submarine.png',
        numberOfStars: 2,
        textExcerpt: 'lorem ipsum ke se farbam rozov',
        timeStamp: '15 minutes ago',
        userName: '69420'
      }
    ];
  }

  onSubmit(authData) {
    this.auth.signUp(authData.email, authData.password);
    this.authForm.reset();
  }
}
