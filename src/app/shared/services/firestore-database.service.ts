import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Category } from '../interfaces/category.interface';
import { Activity } from '../interfaces/activity.interface';

@Injectable({
  providedIn: 'root',
})
export class FirestoreDatabaseService {
  private activitiesCollection: AngularFirestoreCollection<Activity>;

  constructor(private db: AngularFirestore, private afAuth: AuthService) {}

  public getActivities(): Observable<Activity[]> {
    return this.afAuth.getUserId().pipe(
      switchMap(uid => {
        this.activitiesCollection = this.db
          .collection('users')
          .doc(uid)
          .collection('activities');

        return this.activitiesCollection.valueChanges(uid);
      }),
    );
  }

  public getCategories(): Observable<Category[]> {
    return this.db.collection<Category>('categories').valueChanges();
  }

  public addSingleActivity({
    name,
    repeats,
    date,
    categoryId,
  }): Observable<any> {
    return this.afAuth.getUserId().pipe(
      tap(uid => {
        this.db
          .collection('users')
          .doc(uid)
          .collection('activities')
          .add({ name, repeats, date, categoryId });
      }),
      tap(uid => {
        this.db
          .collection('users')
          .doc(uid)
          .set({ isAdmin: false });
      }),
      map(() => this.activitiesCollection.valueChanges()),
    );
  }

  public addSingleCategory({ name, image }): void {
    const categoryId = this.db.createId();
    this.db.collection('categories').add({ name, image, id: categoryId });
  }
}
