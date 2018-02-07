import { TestBed, async } from '@angular/core/testing';
import {AppComponent} from './app.component';
import {By} from '@angular/platform-browser';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {IFormattedScoreCard} from './app.component';
import {IParticipant, ParticipantService} from './services/participant.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ScorecardService} from './services/scorecard.service';
import {HttpClientModule} from '@angular/common/http';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        NgbModule.forRoot(),
        HttpClientModule
      ],
      providers: [ParticipantService, ScorecardService],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
