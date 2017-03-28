import { TestBed, inject } from '@angular/core/testing';
import { LaughingManService } from './laughing-man.service';

describe('LaughingManService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LaughingManService]
    });
  });

  it('should ...', inject([LaughingManService], (service: LaughingManService) => {
    expect(service).toBeTruthy();
  }));
});
