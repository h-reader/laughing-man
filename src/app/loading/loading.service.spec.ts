import { TestBed, inject } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
  });

  it('should ...', inject([LoadingService], (service: LoadingService) => {
    expect(service).toBeTruthy();
  }));

  it('normal test', inject([LoadingService], (service: LoadingService) => {
    
    // 初期状態はFalse
    expect(service.isLoading()).toBeFalsy();

    // Loading開始
    service.startLoading();
    expect(service.isLoading()).toBeTruthy();

    // Loading終了
    service.endLoading();
    expect(service.isLoading()).toBeFalsy();
  }));

});
