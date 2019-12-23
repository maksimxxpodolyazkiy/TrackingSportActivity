import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FirestoreDatabaseService } from 'src/app/shared/services/firestore-database.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  public isOpened: boolean = false;
  public categories$;

  @Output() public getSelectedCategory: EventEmitter<
    string
  > = new EventEmitter();

  constructor(private fds: FirestoreDatabaseService) {}

  public ngOnInit(): void {
    this.categories$ = this.fds.getCategories();
  }

  public openDropdown(): void {
    this.isOpened = !this.isOpened;
  }

  public selectCategory(e): void {
    console.log(e);

    this.getSelectedCategory.emit(e.target.innerText);
    this.isOpened = false;
  }
}
