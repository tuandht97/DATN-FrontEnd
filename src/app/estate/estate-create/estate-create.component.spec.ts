import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateCreateComponent } from './estate-create.component';

describe('EstateCreateComponent', () => {
  let component: EstateCreateComponent;
  let fixture: ComponentFixture<EstateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
