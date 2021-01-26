import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseURL = 'http://localhost:8010/api';

  constructor(private httpClient: HttpClient) {
  }

  public get(url: string): Observable<any> {
    return this.httpClient.get(`${this.baseURL}${url}`).pipe(take(1));
  }

  public post(url: string, body: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}${url}`, body).pipe(take(1));
  }

  public put(url: string, body: any): Observable<any> {
    return this.httpClient.put(`${this.baseURL}${url}`, body).pipe(take(1));
  }

  public delete(url: string): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}${url}`).pipe(take(1));
  }

}
