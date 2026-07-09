import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const INITIAL_DATA: User[] = [
  { id: uuid(), username: 'rockets', name: 'Elon', surname: 'Musk' },
  { id: uuid(), username: 'investing', name: 'Nassim', surname: 'Taleb' },
  { id: uuid(), username: 'philosophy', name: 'Yuval', surname: 'Harari' }
];

@Injectable()
export class UserService {
  users$: Observable<User[]>;

  private usersSubject = new BehaviorSubject<User[]>([...INITIAL_DATA]);

  constructor() {
    this.users$ = this.usersSubject.asObservable();
  }

  addUser(user: Partial<User>) {
    const users = this.usersSubject.getValue();

    users.push({ ...user, id: uuid() } as User);

    this.usersSubject.next(users);
  }

  updateUser(user: User) {
    const users = this.usersSubject.getValue();

    const indexToUpdate = users.findIndex((u) => u.id === user.id);
    users[indexToUpdate] = user;

    this.usersSubject.next(users);
  }

  removeUser(id: string) {
    const users = this.usersSubject.getValue();

    const indexToRemove = users.findIndex((user) => user.id === id);
    users.splice(indexToRemove, 1);

    this.usersSubject.next(users);
  }
}

export interface User {
  id: string;
  username: string;
  name: string;
  surname: string;
}
