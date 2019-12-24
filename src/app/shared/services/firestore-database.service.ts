import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class FirestoreDatabaseService {
  private activitiesCollection: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore, private afAuth: AuthService) {}

  public getActivities(): Observable<any> {
    return this.afAuth.getUserId().pipe(
      map(uid => {
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

  // public addSingleActivity({ name, repeats, date }) {
  //   let uid;
  //   this.afAuth.getUserId().subscribe(id => (uid = id));
  //   this.db
  //     .collection('users')
  //     .doc(uid)
  //     .collection('activities')
  //     .add({ name, repeats, date });
  //   this.db
  //     .collection('users')
  //     .doc(uid)
  //     .set({ isAdmin: false });
  //   this.activities$ = this.activitiesCollection.valueChanges();
  // }

  public addSingleActivity({ name, repeats, date, dropdown }) {
    return this.afAuth.getUserId().pipe(
      tap(uid => {
        this.db
          .collection('users')
          .doc(uid)
          .collection('activities')
          .add({ name, repeats, date, dropdown });
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
    // TODO: generate ID and create 2 documents with this id
    this.db.collection('categories').add({
      name,
      image,
    });
  }
}
