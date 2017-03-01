import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaughingManComponent } from './laughing-man.component';

describe('LaughingManComponent', () => {
  let component: LaughingManComponent;
  let fixture: ComponentFixture<LaughingManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaughingManComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaughingManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
