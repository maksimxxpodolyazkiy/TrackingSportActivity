import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  QuerySnapshot,
  DocumentData,
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

  public getCategoriesId(): Observable<void> {
    return this.db
      .collection<Category>('categories')
      .get()
      .pipe(
        map(doc => {
          return doc.forEach(cat => console.log(cat.id));
        }),
      );
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

  public addSingleActivity({ name, repeats, date, categoryId }) {
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
