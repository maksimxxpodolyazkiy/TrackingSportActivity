import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class FirestoreDatabaseService {
  private activitiesCollection: AngularFirestoreCollection<any>;
  public activities$;

  constructor(private afs: AngularFirestore) {
    this.activitiesCollection = this.afs.collection<any>("activities");
    this.activities$ = this.activitiesCollection.valueChanges();
  }

  public getActivities() {
    return this.activities$;
  }

  public addSingleActivity({ name, repeats, date }) {
    this.activitiesCollection.add({ name, repeats, date });
  }
}
