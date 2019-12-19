import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "./auth.service";
import { TouchSequence } from "selenium-webdriver";

@Injectable({
  providedIn: "root"
})
export class FirestoreDatabaseService {
  private activitiesCollection: AngularFirestoreCollection<any>;
  public activities$;

  constructor(
    private db: AngularFirestore,
    private afAuth: AuthService,
    private fds: FirestoreDatabaseService
  ) {}

  public getActivities() {
    const uid = this.afAuth.getUserId();

    if (uid !== null) {
      this.activitiesCollection = this.db
        .collection("users")
        .doc(uid)
        .collection("activities");

      this.activities$ = this.activitiesCollection.valueChanges();
      return this.activities$;
    }
    return;
  }

  public addSingleActivity({ name, repeats, date }) {
    const uid = this.afAuth.getUserId();
    this.db
      .collection("users")
      .doc(uid)
      .collection("activities")
      .add({ name, repeats, date });
    this.activities$ = this.activitiesCollection.valueChanges();
  }
}
