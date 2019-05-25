import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoinComponent } from './user-coin.component';

describe('UserCoinComponent', () => {
  let component: UserCoinComponent;
  let fixture: ComponentFixture<UserCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
