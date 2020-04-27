import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../../shared/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private toastrService: ToastrService,
    private contactService: ContactService
  ) {}

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
      message: new FormControl(contactMessage, Validators.required),
    });
  }

  onSubmitContactForm() {
    this.toastrService.success('Thank You!');
    const newComment = this.contactForm.value;
    this.contactForm.reset();
    this.post(newComment);
  }

  post(comment) {
    this.contactService.postComment(comment);
  }
}
