import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaughingManComponent } from './laughing-man.component';
import { LaughingManService } from './laughing-man.service';
import { LoadingService } from '../loading/loading.service';

describe('LaughingManComponent', () => {
  let component: LaughingManComponent;
  let fixture: ComponentFixture<LaughingManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaughingManComponent ],
      providers: [
        LaughingManService,
        LoadingService
      ]
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
