import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Hardcoded users
  users: User[] = [
    {
      username: 'Bill',
    },
    {
      username: 'Elon',
    },
    {
      username: 'Jeffrey',
    },
    {
      username: 'Mark',
    },
  ];

  constructor() {}

  getUsers(): User[] {
    return this.users;
  }

  getCurrentUsername(): string {
    if (!sessionStorage.getItem('currentUsername')) {
      this.setCurrentUsername(this.users[0].username);
    }
    return sessionStorage.getItem('currentUsername') ?? '';
  }

  setCurrentUsername(username: string): void {
    sessionStorage.setItem('currentUsername', username);
  }
}
