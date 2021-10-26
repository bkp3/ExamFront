import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories: any;

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: null,
  }

  constructor(private _cat: CategoryService, private _snack: MatSnackBar, private _quiz: QuizService) { }

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
  }

  public addQuiz() {
    console.log(this.quizData);

    if (this.quizData.title.trim() == '' || this.quizData.title == null ||
      this.quizData.description.trim() == '' || this.quizData.description == null ||
      this.quizData.maxMarks.trim() == '' || this.quizData.maxMarks == null ||
      this.quizData.numberOfQuestions.trim() == '' || this.quizData.numberOfQuestions == null ||
      this.quizData.category == null) {

      this._snack.open("please fill fields", "ok");
      return;
    }


    //call server

    this._quiz.addQuiz(this.quizData).subscribe(
      (data: any) => {
        //success
        console.log(this.quizData);
        Swal.fire('Success', 'Quiz is Added', 'success');
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: null,
        }

      },
      (error) => {
        //error
        Swal.fire('Error', 'Something went wrong', 'error');
        console.log(error);
        
      }
    );


  }

}
