import { TestBed, async } from '@angular/core/testing';
import {AppComponent, PARTICIPANT_LIST, SCORE_LIST} from './app.component';
import {By} from '@angular/platform-browser';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {IScoreFormatted} from '../interfaces/ScoreFormatted';

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
  it('should change the selectedParticipantId when clicking the select button', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const testParticipantId = PARTICIPANT_LIST[0].id;

    fixture.whenStable().then(_ => {
      fixture.detectChanges();

      expect(app.selectedParticipantId$).toEqual(jasmine.any(Subject));
      app.selectedParticipantId$.subscribe(participantId => {
        expect(participantId).toEqual(testParticipantId);
      });

      app.onClick_selectButton(testParticipantId);
    });
  }));


  it(`should change the Score Card when clicking the select button`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const testParticipantId = PARTICIPANT_LIST[0].id;

    fixture.whenStable().then(_ => {
      fixture.detectChanges();
      const expectedCurrentScoreList: IScoreFormatted[][] = SCORE_LIST
        .filter(score => score.participant1.id === testParticipantId || score.participant2.id === testParticipantId)
        .map(function(score) {
          const useP1AsFirstColumn = score.participant1.value > score.participant2.value;
          const p1Obj: IScoreFormatted = {...score.participant1, name: PARTICIPANT_LIST.find(participant => participant.id === score.participant1.id).name};
          const p2Obj: IScoreFormatted = {...score.participant2, name: PARTICIPANT_LIST.find(participant => participant.id === score.participant2.id).name};
          return [
            useP1AsFirstColumn ? p1Obj : p2Obj,
            useP1AsFirstColumn ? p2Obj : p1Obj,
          ];
        });

      expect(app.currentScoreList$).toEqual(jasmine.any(Observable));
      app.currentScoreList$.subscribe(currentScoreList => {
        expect(currentScoreList).toEqual(expectedCurrentScoreList);
      });

      app.onClick_selectButton(testParticipantId);
    });
  }));
});
