import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostsService} from "../services/posts.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  presentoffset = 0;
  presentlimit = 10;
  questions = [];
  searchtext = '';
  topic = 'All';
  annotation = 'All';
  constructor(private router: Router, private activatedroute: ActivatedRoute, private postsService: PostsService) {
    this.postsService.findAllQuestions({offset: this.presentoffset, limit: this.presentlimit}).subscribe( questions => {
      this.questions=(questions);
      }
    )
  }
  search(){
    this.postsService.findAllQuestions({annotation: this.annotation, topic: this.topic, searchtext: this.searchtext,offset: this.presentoffset, limit: this.presentlimit}).subscribe( questions => {
        this.questions = (questions);
      }
    )
  }
  edit(questionid) {
    this.router.navigate(['/editquestion', questionid])
  }
  ngOnInit() {
  }
  onScroll () {
    console.log("scrolled");
    this.presentoffset += 10;
    this.postsService.findAllQuestions({annotation: this.annotation, searchtext: this.searchtext,offset: this.presentoffset, limit: this.presentlimit}).subscribe( questions => {
      this.questions = this.questions.concat(questions);
    })
  }

}
