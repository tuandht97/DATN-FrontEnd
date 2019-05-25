import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateListComponent } from './estate-list.component';

describe('EstateListComponent', () => {
  let component: EstateListComponent;
  let fixture: ComponentFixture<EstateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
