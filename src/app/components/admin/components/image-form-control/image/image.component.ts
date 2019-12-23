import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ImageService } from 'src/app/shared/services/image.service';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit, OnDestroy {
  public images: any;
  public searchbarForm: FormGroup;
  public searchImagesSub: Subscription;

  @Output() public getSelectedImage: EventEmitter<string> = new EventEmitter();

  constructor(private imageService: ImageService) {}

  public ngOnInit(): void {
    this.searchbarForm = new FormGroup({
      searchText: new FormControl(),
    });
  }

  public onSearch(event, searchRequest: string): void {
    if (
      event.key === 'Enter' ||
      event.type === 'click' ||
      !this.isNullOrWhitespace(searchRequest)
    ) {
      this.searchbarForm.get('searchText').setValue(searchRequest);
      this.searchImagesSub = this.imageService
        .searchImages(searchRequest)
        .subscribe(data => {
          this.images = data;
        });
    }
  }

  public isNullOrWhitespace(searchRequest: string): boolean {
    return !searchRequest || !searchRequest.trim();
  }

  public onAddImage(event): void {
    this.getSelectedImage.emit(event.target.currentSrc);
  }

  public ngOnDestroy() {}
}
