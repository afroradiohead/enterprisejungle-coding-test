import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export interface IScoreCard {
  participant1: {
    id: number;
    value: number;
  };
  participant2: {
    id: number;
    value: number;
  };
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
