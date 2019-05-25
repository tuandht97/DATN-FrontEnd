import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateComponent } from './estate.component';

describe('EstateComponent', () => {
  let component: EstateComponent;
  let fixture: ComponentFixture<EstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
