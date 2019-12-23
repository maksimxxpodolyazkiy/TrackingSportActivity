import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreDatabaseService {
  private activitiesCollection: AngularFirestoreCollection<any>;
  public activities$;

  constructor(private db: AngularFirestore, private afAuth: AuthService) {}

  public getActivities(): Observable<any> {
    return this.afAuth.getUserId().pipe(
      map(uid => {
        this.activitiesCollection = this.db
          .collection('users')
          .doc(uid)
          .collection('activities');

        this.activities$ = this.activitiesCollection.valueChanges();

        return this.activities$;
      }),
    );
  }

  public getCategories(): Observable<any> {
    return this.db.collection('categories').valueChanges();
  }

  public addSingleActivity({ name, repeats, date, dropdown }) {
    let uid;
    this.afAuth.getUserId().subscribe(id => (uid = id));
    this.db
      .collection('users')
      .doc(uid)
      .collection('activities')
      .add({ name, repeats, date, dropdown });
    this.db
      .collection('users')
      .doc(uid)
      .set({ isAdmin: false });
    this.activities$ = this.activitiesCollection.valueChanges();
  }

  public addSingleCategory({ name, image }): void {
    this.db.collection('categories').add({
      name,
      image,
    });
  }
}
