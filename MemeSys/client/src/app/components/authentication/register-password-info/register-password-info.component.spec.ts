import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPasswordInfoComponent } from './register-password-info.component';

describe('RegisterPasswordInfoComponent', () => {
  let component: RegisterPasswordInfoComponent;
  let fixture: ComponentFixture<RegisterPasswordInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPasswordInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPasswordInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
