import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId: any;
  quizzes: any;

  constructor(private _route: ActivatedRoute, private _quiz: QuizService) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      (params: any) => {
        this.catId = params.catId;
        if (this.catId == 0) {
          console.log('Load all the quiz');
          this._quiz.quizzes().subscribe(
            (data: any) => {
              this.quizzes = data;
              console.log(this.quizzes);

            },
            (error) => {
              console.log(error);

            }
          );

        } else {
          console.log('Load specific quiz');
          this._quiz.getQuizzesOfCategory(this.catId).subscribe(
            (data: any) => {
              this.quizzes = data;
            },
            (error) => {
              console.log(error);

            }
          );
        }

      }
    );

  }

}
