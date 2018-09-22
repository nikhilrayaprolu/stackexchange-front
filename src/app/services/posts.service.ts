import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class PostsService {
  server = 'http://localhost:3002';
  questionroute = this.server + '/questions';
  answerroute = this.server + '/answers';
  answerupdate = this.server + '/answerupdate';
  constructor(  private http: Http) { }
  findAllQuestions(params) {
    return this.http
      .post(this.questionroute, params).map(res => {
        return res.json();
      });
  }
  findAnswerstoQuestion(params) {
    return this.http
      .post(this.answerroute, params).map(res => {
        return res.json();
      });
  }
  updateAnswer(params) {
    return this.http
      .post(this.answerupdate, params).map(res => {
        return res.json();
      });
  }
}
