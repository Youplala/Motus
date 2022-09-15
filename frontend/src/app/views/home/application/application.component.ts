import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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


  constructor(public _request: RequestService) {

  }

  ngOnInit() {
    this._request.get('firstHint').subscribe({next: (data: any) => {
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
      this.formControl.setValue('')
      this._request.get('guess?guess='+word).subscribe({next: (data: any) => {
        const word: string[] = data.guess
        const code: number[] = data.hint
        const out: Letter[] = []
        for (let i = 0; i < word.length; i++) {
          out.push({letter: word[i], code: code[i]})
        }
        this.records.push(out)
        },
      complete:() => {
        this.loading = false
      }
      }
      )
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


