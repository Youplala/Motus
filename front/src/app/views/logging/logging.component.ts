import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.scss']
})
export class LoggingComponent implements OnInit {

  @Output() emitter = new EventEmitter<string>();

  public form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
});
  public loading: boolean = false;
  public submitted: boolean = false;

  constructor(private _authService: AuthService) {
  }

  ngOnInit() {
  }

  get f() { return this.form.controls; }


  public async onSubmit() {
    this.loading = true;
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value)
    await this._authService.login(this.form.value.username, this.form.value.password);
    this.loading = false;
  }

  public async register() {
  this.loading = true;
  this.submitted = true;
  if (this.form.invalid) {
    return;
  }
  await this._authService.register(this.form.value.username, this.form.value.password);
  this.loading = false;
  }


}
