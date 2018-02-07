import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export interface IParticipant {
  id: Number;
  name: string;
  played: Number;
  won: Number;
}

@Injectable()
export class ParticipantService {

  constructor(private http: HttpClient) { }

  /**
   * @returns {Observable<IParticipant[]>}
   */
  get(): Observable<IParticipant[]> {
    return this.http.get('assets/participants.json') as Observable<IParticipant[]>;
  }
}
