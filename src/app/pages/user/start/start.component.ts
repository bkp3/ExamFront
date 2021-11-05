import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid: any;
  questions: any;
  // givenAnswer:any;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;

  timer: any;

  constructor(private locationSt: LocationStrategy, private _route: ActivatedRoute, private _question: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
  }

  public loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        //success
        //console.log(data);

        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        console.log(this.questions);
        this.startTimer();

        this.questions.forEach(
          (q: any) => {
            q['givenAnswer'] = '';
          }
        );
      },
      (error) => {
        //error
        console.log(error);

      }
    );

  }

  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(
      () => {
        history.pushState(null, location.href);
      }
    )
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: "info",
    }).then(
      (e) => {
        if (e.isConfirmed) {
          this.evalQuiz();


        }
      }
    )
  }

  public startTimer() {
    let t = window.setInterval(
      () => {
        if (this.timer <= 0) {
          this.evalQuiz();
          clearInterval(t);

        } else {
          this.timer--;
        }
      }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  public evalQuiz() {
    this.isSubmit = true;
    //calculations
    this.questions.forEach(
      (q: any) => {
        if (q.givenAnswer == q.answer) {
          this.correctAnswers++;
          let markSingle = this.questions[0].quiz.maxMarks / this.questions.length;
          this.marksGot += markSingle;
        }
        if (q.givenAnswer.trim() != '') {
          this.attempted++;
        }

      }
    )
    console.log(this.correctAnswers);
    console.log(this.marksGot);
    console.log(this.attempted);
  }

}
