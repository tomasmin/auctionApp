import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss'],
})
export class UserSelectComponent implements OnInit {
  users: User[] = [];
  selectedUsername: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.selectedUsername = this.userService.getCurrentUsername();
  }

  changeUser(username: string): void {
    this.userService.setCurrentUsername(username);
    location.reload();
  }
}
