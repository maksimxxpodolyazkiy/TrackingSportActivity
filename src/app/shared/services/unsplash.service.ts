import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnsplashApiResponse } from '../interfaces/unsplash-api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UnsplashService {
  constructor(private http: HttpClient) {}

  public getPhotosFromUnsplash(searchText): Observable<UnsplashApiResponse> {
    return this.http.get<UnsplashApiResponse>(
      `https://api.unsplash.com/search/photos?query=${searchText}&per_page=10&page=1`,
      {
        headers: {
          authorization:
            'Client-ID 8ad318674f52e5c6b766fe2d4fa5496ed38818604a7358098c581dd107a52181',
        },
      },
    );
  }
}
