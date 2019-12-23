import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreDatabaseService } from 'src/app/shared/services/firestore-database.service';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public isVisible: boolean = false;

  public categories$;
  public categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  constructor(private fds: FirestoreDatabaseService) {}

  public showModal(): void {
    this.isVisible = true;
  }

  public onEnter(): void {
    this.handleCancel();
  }

  public handleOk(): void {
    this.isVisible = false;
  }

  public handleCancel(): void {
    this.isVisible = false;
  }

  public onAddCategory() {
    this.fds.addSingleCategory(this.categoryForm.value);
  }

  public ngOnInit(): void {
    this.categories$ = this.fds.getCategories();
  }
}
