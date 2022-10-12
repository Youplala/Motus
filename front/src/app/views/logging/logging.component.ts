import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';

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

  constructor(private _requestService: RequestService) {
  }

  ngOnInit() {
  }

  get f() { return this.form.controls; }


  public onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value)
    this._requestService.get('auth/login/?username='+this.form.value.username+'&password='+this.form.value.password).subscribe({
      next: (data: any) => {
        console.log(data)
        if (data.auth) {
          this.emitter.emit(data.token);
        } else {
          this.emitter.emit('');
        }
      },
    })


  }


}
