import { TestBed, async } from '@angular/core/testing';
import {AppComponent} from './app.component';
import {By} from '@angular/platform-browser';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {IFormattedScoreCard} from './app.component';
import {IScore} from '../interfaces/Score';
import {IParticipant} from './services/participant.service';

export const PARTICIPANT_LIST: IParticipant[] = [
  {id: 1, name: 'Maria Coleman', played: 5, won: 2 },
  {id: 2, name: 'Michael Harris', played: 3, won: 1 },
  {id: 3, name: 'James Mitchell', played: 3, won: 3 }
];

export const SCORE_LIST: {participant1: IScore, participant2: IScore}[] = [{
  participant1: {
    id: 1,
    value: 12,
  },
  participant2: {
    id: 2,
    value: 43
  }
}, {
  participant1: {
    id: 3,
    value: 43,
  },
  participant2: {
    id: 2,
    value: 12
  }
}];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should update selectedParticipantId when clicking the select button', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const testParticipantId = PARTICIPANT_LIST[0].id;

    console.log(done);

    fixture.whenStable().then(_ => {
      fixture.detectChanges();

      expect(app.selectedParticipantId$).toEqual(jasmine.any(Subject));
      app.selectedParticipantId$.subscribe(participantId => {
        expect(participantId).toEqual(testParticipantId);
        done();
      });

      app.onClick_selectButton(testParticipantId);
    });
  });

  it(`should update currentScoreList$ when clicking the select button`, done => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const testParticipantId = PARTICIPANT_LIST[0].id;


    fixture.whenStable().then(_ => {
      fixture.detectChanges();
      const expectedCurrentScoreList: IFormattedScoreCard[][] = SCORE_LIST
        .filter(score => score.participant1.id === testParticipantId || score.participant2.id === testParticipantId)
        .map(function(score) {
          const useP1AsFirstColumn = score.participant1.value > score.participant2.value;
          const p1Obj: IFormattedScoreCard = {...score.participant1, name: PARTICIPANT_LIST.find(participant => participant.id === score.participant1.id).name};
          const p2Obj: IFormattedScoreCard = {...score.participant2, name: PARTICIPANT_LIST.find(participant => participant.id === score.participant2.id).name};
          return [
            useP1AsFirstColumn ? p1Obj : p2Obj,
            useP1AsFirstColumn ? p2Obj : p1Obj,
          ];
        });

      expect(app.currentScoreList$).toEqual(jasmine.any(Observable));
      app.currentScoreList$.subscribe(currentScoreList => {
        expect(currentScoreList).toEqual(expectedCurrentScoreList);

        done();
      });

      app.onClick_selectButton(testParticipantId);
    });
  });




});
