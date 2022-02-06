import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#setCurrentUsername should set value in session storage', () => {
    service.setCurrentUsername('Jeffrey');
    expect(sessionStorage.getItem('currentUsername')).toBe('Jeffrey');
  });

  it('#getCurrentUsername should get value from session storage', () => {
    sessionStorage.setItem('currentUsername', 'Elon');
    expect(service.getCurrentUsername()).toBe('Elon');
  });
});
