import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;

  qId: any;
  qTitle: any;

  question = {
    quiz: {
      qId: '',
    },
    content: '',
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    answer: ''
  }

  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    this.question.quiz['qId'] = this.qId;
  }

  formSubmit() {

    if (this.question.content.trim() == '' || this.question.content == null ||
      this.question.question1.trim() == '' || this.question.question1 == null ||
      this.question.question2.trim() == '' || this.question.question2 == null ||
      this.question.question3.trim() == '' || this.question.question3 == null ||
      this.question.question4.trim() == '' || this.question.question4 == null ||
      this.question.answer.trim() == '' || this.question.answer == null) {

      this._snack.open("Please fill the required fields", "ok");
      return;
    }
    console.log(this.question);

    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        Swal.fire('Success','Question Added','success');
        this.question.content='';
        this.question.question1='';
        this.question.question2='';
        this.question.question3='';
        this.question.question4='';
        this.question.answer='';
      },
      (error)=>{
        //error
        console.log(error);
        Swal.fire('Success','Something went wrong','error');
      }
    );

  }



}
