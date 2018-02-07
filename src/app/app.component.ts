import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {IParticipant, ParticipantService} from './services/participant.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ScorecardService} from './services/scorecard.service';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {IScore} from '../interfaces/Score';
import 'rxjs/add/operator/do';

export interface IFormattedScoreCard extends IScore {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  participantList: IParticipant[] = [];
  modalParticipant: IParticipant;
  formattedScoreCardListForSelectedParticipant: IFormattedScoreCard[][] = [];
  @ViewChild('#participantModal') participantModalEl;

  selectedParticipantId$: Subject<number> = new Subject<number>();

  constructor(private modalService: NgbModal, private participantService: ParticipantService, private scoreCardService: ScorecardService) {}

  ngOnInit() {
    const scoreCardList$ = this.scoreCardService.get();
    const participantList$ = this.participantService.get();

    combineLatest(this.selectedParticipantId$, scoreCardList$, participantList$)
      .map(([selectedParticipantId, scoreCardList, participantList]) => {
        return scoreCardList
          .filter(scoreCard => scoreCard.participant1.id === selectedParticipantId || scoreCard.participant2.id === selectedParticipantId)
          .map(function(score) {
            const useP1AsFirstColumn = score.participant1.value > score.participant2.value;
            const p1Obj: IFormattedScoreCard = {...score.participant1, name: participantList.find(({id}) => id === score.participant1.id).name};
            const p2Obj: IFormattedScoreCard = {...score.participant2, name: participantList.find(({id}) => id === score.participant2.id).name};
            return [
              useP1AsFirstColumn ? p1Obj : p2Obj,
              useP1AsFirstColumn ? p2Obj : p1Obj,
            ];
          });
      })
      .do(v => this.formattedScoreCardListForSelectedParticipant = v)
      .subscribe();

    participantList$
      .do(v => this.participantList = v)
      .subscribe();
  }

  onClick_selectButton(participantId) {
    this.selectedParticipantId$.next(participantId);
  }

  onClick_participantModalTrigger(participantId, template) {
    this.modalParticipant = this.participantList.find(({id}) => id === participantId);
    this.modalService.open(template);
  }
}
