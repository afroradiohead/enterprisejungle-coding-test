import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ParticipantService} from './services/participant.service';
import {HttpClientModule} from '@angular/common/http';
import {ScorecardService} from './services/scorecard.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [ParticipantService, ScorecardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
