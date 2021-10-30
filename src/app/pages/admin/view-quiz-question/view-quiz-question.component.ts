import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit {

  qId: any;
  qTitle: any;
  questions: any;

  constructor(private _route: ActivatedRoute, private _question: QuestionService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qId;
    this.qTitle = this._route.snapshot.params.title;

    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        //success
        console.log(data);

        this.questions = data;

      },
      (error) => {
        //error
        console.log(error);

      }
    )


  }

  //delete question
  deleteQuestion(qid: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure, want to delete this question?'
    }).then((result) => {
      if (result.isConfirmed) {
        //confirm
        this._question.deleteQuestion(qid).subscribe(
          (data) => {
            //success
            Swal.fire('Success', 'Question is deleted successfully.', 'success');
            this.questions = this.questions.filter((q: any) => q.quesId != qid);
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
