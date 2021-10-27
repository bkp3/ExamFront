import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _router: Router, private _snack: MatSnackBar, private _route: ActivatedRoute, private _quiz: QuizService, private _cat: CategoryService) { }

  categories: any;

  qId: any;
  quiz: any;

  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data: any) => {
        //success
        this.categories = data;
        console.log(this.categories);

      },
      (error) => {
        //error
        console.log(error);
        Swal.fire('Error!!', 'Server Error', 'error');
      }
    );


    this.qId = this._route.snapshot.params.qid;
    //alert(this.qId);

    this._quiz.getQuiz(this.qId).subscribe(
      (data: any) => {
        //success
        this.quiz = data;
        console.log(this.quiz);

      },
      (error) => {
        //error
        console.log(error);

      }
    );

  }


  //update quiz
  public updateQuiz() {
    if (this.quiz.title.trim() == '' || this.quiz.title == null ||
      this.quiz.description.trim() == '' || this.quiz.description == null ||
      this.quiz.maxMarks.trim() == '' || this.quiz.maxMarks == null ||
      this.quiz.numberOfQuestions.trim() == '' || this.quiz.numberOfQuestions == null ||
      this.quiz.category == null) {

      this._snack.open("please fill fields", "ok");
      return;
    }


    this._quiz.updateQuiz(this.quiz).subscribe(
      (data: any) => {
        //success
        Swal.fire("Success", "Quiz is updated", "success").then((e) => {
          this._router.navigate(['/admin/quizzes']);
        })

      },
      (error) => {
        //error
        Swal.fire("Error", "Something went wrong", "error").then((e) => {
          this._router.navigate(['/admin/quizzes']);
        })
      }
    )
  }

}
