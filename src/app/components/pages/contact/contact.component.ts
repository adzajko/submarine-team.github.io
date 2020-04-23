import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private toastrService: ToastrService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const contactName = '';
    const contactEmail = '';
    const contactMessage = '';

    this.contactForm = new FormGroup({
      name: new FormControl(contactName, Validators.required),
      email: new FormControl(contactEmail, Validators.email),
      message: new FormControl(contactMessage, Validators.required)
    });
  }

  onSubmitContactForm() {
    this.toastrService.info('Feature coming soon!');
    console.log(this.contactForm.value);
  }
}
