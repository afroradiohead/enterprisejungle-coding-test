import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  participantList = [
    {id: 1, name: 'Maria Coleman', played: 5, won: 2 },
    {id: 2, name: 'Michael Harris', played: 3, won: 1 },
    {id: 3, name: 'James Mitchell', played: 3, won: 3 }
  ];

  scoreList = [{
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

  selectedParticipantId$: Subject<number> = new Subject<number>();
  currentScoreList$: Observable<any[]>;

  ngOnInit() {
     this.currentScoreList$ =
       this.selectedParticipantId$
         .map(participantId => {
           return this.scoreList.filter(score => score.participant1.id === participantId || score.participant2.id === participantId);
         });

    this.selectedParticipantId$.next(1);
  }

  onClick_selectButton(participantId) {
    this.selectedParticipantId$.next(participantId);
  }

}
