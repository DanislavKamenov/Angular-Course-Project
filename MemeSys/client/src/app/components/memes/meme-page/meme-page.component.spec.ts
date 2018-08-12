import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemePageComponent } from './meme-page.component';

describe('MemePageComponent', () => {
  let component: MemePageComponent;
  let fixture: ComponentFixture<MemePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
