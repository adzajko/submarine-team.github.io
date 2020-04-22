import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../modules/material/material.module';
import { AuthService } from '../../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  authForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    this.authForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  onSubmit(authData) {
    this.auth.signUp(authData.email, authData.password);
    this.authForm.reset();
  }

  triggerToast() {
    this.toastr.info('Submarine Project coming soon!');
  }
}
