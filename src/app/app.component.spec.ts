import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LaughingManComponent } from './laughing-man/laughing-man.component';
import { LoadingService } from './loading/loading.service';
import { LoadingComponent } from './loading/loading.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LaughingManComponent,
        LoadingComponent
      ],
      providers: [ LoadingService ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'LauginMan Service!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('LauginMan Service!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('LauginMan Service!');
  }));
});
