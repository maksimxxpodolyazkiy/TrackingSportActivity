import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnsplashService } from './unsplash.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private service: UnsplashService) {}

  public searchImages(searchText): Observable<string[]> {
    return this.service.getPhotosFromUnsplash(searchText).pipe(
      map(data =>
        data.results.map(item => {
          return item.urls.thumb;
        }),
      ),
    );
  }
}
