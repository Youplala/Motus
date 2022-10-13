import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs';
import { MotusService } from 'src/app/services/motus.service';
import { RequestService } from 'src/app/services/request.service';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  public records: Letter[][] = [];
  public indices: Letter[][] = [];

  public isValid: boolean = false;

  public formControl: FormControl = new FormControl('');

  public LoadingPage: boolean = true;
  public loading: boolean = false;

  constructor(
    public _motusService: MotusService,
    public _scoreService: ScoreService
  ) {
    this._motusService.getFirstHint().subscribe({
      next: (data: any) => {
        console.log(data);
        const word: string[] = data.firstHint;
        const code: number[] = data.hint;
        const out: Letter[] = [];
        for (let i = 0; i < word.length; i++) {
          out.push({ letter: word[i], code: code[i] });
        }
        this.indices.push(out);
      },
      complete: () => {
        this._scoreService.getRecords().subscribe({
          next: (data: any) => {
            console.log(data);
            // order data by nb_try
            data.sort((a: any, b: any) => {
              return a.nb_try - b.nb_try;
            });
            data.forEach((element: any) => {
              console.log('element', element);
              if (
                element.indice.indexOf('0') === -1 &&
                element.indice.indexOf('1') === -1
              ) {
                this.isValid = true;
              }
              var guess: string[] = Array.from(element.guess);
              var indice: string[] = Array.from(element.indice);
              var out: Letter[] = [];
              for (let i = 0; i < guess.length; i++) {
                out.push({ letter: guess[i], code: Number(indice[i]) });
              }
              this.records.push(out);
            });
          },
          complete: () => {
            this.LoadingPage = false;
          },
        });
      },
    });
  }

  ngOnInit() {}

  public guess() {
    console.log('Guesss');
    const word = this.formControl.value;
    console.log(this.records);
    this.loading = true;
    this._motusService.isWord(word.toLowerCase()).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.isWord && data.len) {
          this._motusService.guess(word.toLowerCase()).subscribe({
            next: (data: any) => {
              const word: string[] = data.guess;
              const code: number[] = data.hint;
              if (code.indexOf(0) === -1 && code.indexOf(1) === -1) {
                this.isValid = true;
              }
              const out: Letter[] = [];
              for (let i = 0; i < word.length; i++) {
                out.push({ letter: word[i], code: code[i] });
              }
              this.records.push(out);
              if (code.indexOf(0) === -1 && code.indexOf(1) === -1) {
                console.log('GG');
              }
            },
            complete: () => {
              this.loading = false;
              this.formControl.setValue('');
              this._scoreService.getScore();
            },
          });
        } else {
          var error_message = 'Error : ';
          if (!data.isWord) {
            error_message += 'The word is not in the dictionnary. ';
          }
          if (!data.len) {
            error_message += 'The word is not the right length. ';
          }
          alert(error_message);
          this.formControl.setValue('');
          this.loading = false;
        }
      },
    });
  }
}

class Letter {
  public letter: string;
  public code: number;

  constructor(letter: string, code: number) {
    this.letter = letter;
    this.code = code;
  }
}
