import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateUpdateComponent } from './estate-update.component';

describe('EstateUpdateComponent', () => {
  let component: EstateUpdateComponent;
  let fixture: ComponentFixture<EstateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
