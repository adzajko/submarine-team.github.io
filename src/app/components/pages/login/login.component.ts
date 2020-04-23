import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('logiRegi') logiRegi: ElementRef;
  @Output() clMod = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  triggerLogin() {
    this.logiRegi.nativeElement.classList.remove('panel-active');
  }

  triggerRegister() {
    this.logiRegi.nativeElement.classList.add('panel-active');
  }

  closeModal() {
    this.clMod.emit(false);
  }
}
