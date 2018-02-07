import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {IParticipant} from '../interfaces/Participant';
import {IScore} from '../interfaces/Score';
import {IScoreFormatted} from '../interfaces/ScoreFormatted';

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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  participantList = PARTICIPANT_LIST;

  scoreList = SCORE_LIST;

  selectedParticipantId$: Subject<number> = new Subject<number>();
  currentScoreList$: Observable<IScoreFormatted[][]>;

  ngOnInit() {
     this.currentScoreList$ =
       this.selectedParticipantId$
         .map(participantId => {
           return this.scoreList
             .filter(score => score.participant1.id === participantId || score.participant2.id === participantId)
             .map(function(score) {
               const useP1AsFirstColumn = score.participant1.value > score.participant2.value;
               const p1Obj: IScoreFormatted = {...score.participant1, name: PARTICIPANT_LIST.find(participant => participant.id === score.participant1.id).name};
               const p2Obj: IScoreFormatted = {...score.participant2, name: PARTICIPANT_LIST.find(participant => participant.id === score.participant2.id).name};
               return [
                 useP1AsFirstColumn ? p1Obj : p2Obj,
                 useP1AsFirstColumn ? p2Obj : p1Obj,
               ];
             });
         });
  }

  onClick_selectButton(participantId) {
    this.selectedParticipantId$.next(participantId);
  }

}
