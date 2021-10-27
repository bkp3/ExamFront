import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes: any;

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this._quiz);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!', 'Error in loading data', 'error');

      }
    )
  }


  //delete quiz
  deleteQuiz(qId: any) {
    //alert(qId);

    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete

        this._quiz.deleteQuiz(qId).subscribe(
          (data: any) => {
            //success
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId != qId);
            Swal.fire('Success', 'Quiz deleted', 'success');
          },
          (error) => {
            //error
            Swal.fire('Error', 'Something went wrong', 'error');
          }
        );

      }
    })
  }

}
