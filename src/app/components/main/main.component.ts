import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirestoreDatabaseService } from 'src/app/shared/services/firestore-database.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { map, subscribeOn } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(private fds: FirestoreDatabaseService) {}

  public activities;
  public fbRepeats;
  public categories: Array<{ name: string; value: any }>;
  public fbRepeatsSub: Subscription;
  public categoriesSub: Subscription;
  public activityForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    repeats: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
    dropdown: new FormControl(null, Validators.required),

    // dropdown: [this.fb.array(
    //   this.categories.map(elem => this.createMemberGroup(elem)),
    // ),]
  });

  public ngOnInit(): void {
    this.categoriesSub = this.fds.getCategories().subscribe(items => {
      this.categories = items.map(item => ({ name: item.name, value: item }));
    });

    this.activityForm.valueChanges.subscribe(item => console.log(item));

    // this.categoriesSub = this.fds
    //   .getCategories()
    //   .subscribe(item => (this.categories = item));

    this.fbRepeatsSub = this.fds.getActivities().subscribe(obs =>
      obs.subscribe(val => {
        this.activities = val;
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

  // public createMemberGroup(member): FormGroup {
  //   return this.fb.group({
  //     ...member,
  //     ...{
  //       name: [member.name, Validators.required],
  //     },
  //   });
  // }

  public onAddActivity(): void {
    this.fds.addSingleActivity(this.activityForm.value).subscribe();
    this.activityForm.reset();
  }

  public onDeleteActivity(item): void {
    this.activities = this.activities.filter(i => i !== item);
  }

  public ngOnDestroy() {}
}
