import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  triggerToast(event: Event) {
    this.toastr.success('Success!', event.type);
    this.toastr.error('LMamo');
  }
}
