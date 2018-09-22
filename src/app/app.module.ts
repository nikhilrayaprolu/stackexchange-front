import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./services/auth.guard";
import {AuthenticationService} from "./services/authentication.service";
import {UserService} from "./services/user.service";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { DashboardComponent } from './dashboard/dashboard.component';
import {PostsService} from "./services/posts.service";
import { EditquestionComponent } from './editquestion/editquestion.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import {DataTablesModule} from "angular-datatables";
const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'editquestion/:id', component: EditquestionComponent, canActivate: [AuthGuard]},
  {path: 'scoreboard', component: ScoreboardComponent},
  {path: 'profile', component: UserprofileComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EditquestionComponent,
    ScoreboardComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTablesModule,
    InfiniteScrollModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthGuard,
    AuthenticationService,
    UserService,
    PostsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
