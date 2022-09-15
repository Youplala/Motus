import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  public records: Letter[][]= []

  constructor(public _request: RequestService) {

   }

  ngOnInit() {
    this._request.get('firstHint').subscribe((data: any) => {
      const word: string[] = data.firstHint
      const code: number[] = data.hint
      const out: Letter[] = []
      for (let i = 0; i < word.length; i++) {
        out.push({letter: word[i], code: code[i]})
      }
      this.records.push(out)
    });

    this._request.post('guess', {guess: 'huiles'}).subscribe((data: any) => {console.log(data)})
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
