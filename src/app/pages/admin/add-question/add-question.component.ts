import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  qId: any;
  qTitle:any;

  question = {
    quiz: {
      qId:'',
    },
    content: '',
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    answer: ''
  }

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this.qTitle=this._route.snapshot.params.title;
    this.question.quiz['qId']=this.qId;



  }

}
