import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpService: HttpService) {
  }

  public login(email: string, password: string): Observable<User> {
    const requestBody = {
      email: email,
      password: password
    };

    return this.httpService.post(`/login`, requestBody);
  }

}
