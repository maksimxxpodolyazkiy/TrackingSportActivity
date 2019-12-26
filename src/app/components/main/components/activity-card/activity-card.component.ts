import { Component, OnInit, Input } from '@angular/core';
import { FirestoreDatabaseService } from 'src/app/shared/services/firestore-database.service';
import { Activity } from 'src/app/shared/interfaces/activity.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
})
export class ActivityCardComponent implements OnInit {
  @Input() public item: Activity;
  public selectedCategory: Category;

  constructor(private fds: FirestoreDatabaseService) {}

  ngOnInit() {
    this.fds.getCategories().subscribe(categories => {
      this.selectedCategory = categories.find(
        item => item.id === this.item.categoryId,
      );
    });
  }
}
