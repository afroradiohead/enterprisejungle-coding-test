import { Injectable } from '@angular/core';
import {IScore} from '../../interfaces/Score';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export interface IScoreCard {
  participant1: IScore;
  participant2: IScore;
}

@Injectable()
export class ScorecardService {

  constructor(private http: HttpClient) { }

  /**
   * @returns {Observable<IScoreCard[]>}
   */
  get(): Observable<IScoreCard[]> {
    return this.http.get('assets/scores.json') as Observable<IScoreCard[]>;
  }
}
