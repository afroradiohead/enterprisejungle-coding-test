import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {By} from '@angular/platform-browser';
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
  it('should update the selected participant id to change when clicking the selected button', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.selectedParticipantId$.subscribe(participantId => {
      expect(participantId).toEqual(app.participantList[0].id);
    });

    fixture.whenStable().then(_ => {
      fixture.detectChanges();
      fixture.debugElement.query(By.css('.select-button:first-child')).triggerEventHandler('click', null);
    });
  }));


});
