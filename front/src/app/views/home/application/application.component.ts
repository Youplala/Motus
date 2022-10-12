import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs';
import { MotusService } from 'src/app/services/motus.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  public records: Letter[][]= []

  public formControl: FormControl = new FormControl('')

  public LoadingPage: boolean = true
  public loading: boolean = false


  constructor(public _motusService: MotusService) {

  }

  ngOnInit() {
    this._motusService.getFirstHint().subscribe({
      next: (data: any) => {
        console.log(data)
      const word: string[] = data.firstHint
      const code: number[] = data.hint
      const out: Letter[] = []
      for (let i = 0; i < word.length; i++) {
        out.push({letter: word[i], code: code[i]})
      }
      this.records.push(out)
    },
    complete: () => {this.LoadingPage = false}
      });
  }

  public guess() {
    const word = this.formControl.value
    if(word.length !== this.records[0].length) {
      console.log('Not the right length')
    } else {

      this.loading = true

      this._motusService.isWord(word).subscribe({
        next: (data: any) => {
          console.log(data)
          if(data.isWord){
            this._motusService.guess(word).subscribe({next: (data: any) => {
              const word: string[] = data.guess
              const code: number[] = data.hint
              const out: Letter[] = []
              for (let i = 0; i < word.length; i++) {
                out.push({letter: word[i], code: code[i]})
              }
              this.records.push(out)
              if(code.indexOf(0) === -1 && code.indexOf(1) === -1 ){
                console.log('GG')
              }
              },
            complete:() => {
              this.loading = false
              this.formControl.setValue('')
            }
            }
            )
          } else {
            console.log('Does not exist')
            this.loading = false
          }
        }
      })
    }
  }

}



class Letter {
  public letter: string;
  public code: number;

  constructor(letter: string, code : number) {
    this.letter = letter;
    this.code= code;
  }
}
