import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirestoreDatabaseService } from 'src/app/shared/services/firestore-database.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(private fds: FirestoreDatabaseService) {
    this.activityForm.valueChanges.subscribe(item => console.log(item));
  }

  public activities;
  public fbRepeats;
  public activitiesSub: Subscription;
  public fbRepeatsSub: Subscription;

  public activityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    repeats: new FormControl(null, Validators.required),
    date: new FormControl('', Validators.required),
    dropdown: new FormControl(''),
  });

  public ngOnInit(): void {
    this.activitiesSub = this.fds
      .getActivities()
      .subscribe(obs => obs.subscribe(item => (this.activities = item)));
    this.fbRepeatsSub = this.fds.getActivities().subscribe(obs =>
      obs.subscribe(val => {
        const activities = val.map(({ date, repeats }) => {
          const dayOfTheWeek = new Date(date.seconds * 1000).getDay();
          return {
            dayOfTheWeek,
            repeats,
          };
        });

        const counts = activities.reduce((prev, curr) => {
          const count = prev.get(curr.dayOfTheWeek) || 0;
          prev.set(curr.dayOfTheWeek, +curr.repeats + count);
          return prev;
        }, new Map());

        const reducedActivities = [...counts].map(([dayOfTheWeek, repeats]) => {
          return { dayOfTheWeek, repeats };
        });

        reducedActivities.sort((a, b) => {
          const dayA = a.dayOfTheWeek;
          const dayB = b.dayOfTheWeek;
          let comparison = 0;
          if (dayA > dayB) {
            comparison = 1;
          } else if (dayA < dayB) {
            comparison = -1;
          }
          return comparison;
        });

        const arrDaysOfTheWeek = [0, 0, 0, 0, 0, 0, 0];
        reducedActivities.forEach(item => {
          arrDaysOfTheWeek[item.dayOfTheWeek] = item.repeats;
        });

        this.fbRepeats = arrDaysOfTheWeek;
      }),
    );
  }

  public onAddActivity(): void {
    this.fds.addSingleActivity(this.activityForm.value);
    this.activityForm.reset();
  }

  public ngOnDestroy() {}
}
