import { TestBed, inject } from '@angular/core/testing';

import { LaughingManService } from './laughing-man.service';
import { LoadingService } from '../loading/loading.service';

describe('LaughingManService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LaughingManService,
        LoadingService
      ]
    });
  });

  it('should ...', inject([LaughingManService], (service: LaughingManService) => {
    expect(service).toBeTruthy();
  }));

  describe('正常系', () => {
    const canvas = document.createElement('canvas');
    const blob: Blob = new Blob();

    // サンプル用の画像データを出力
    /*
    let req = new XMLHttpRequest();
    req.open("GET", "../../assets/laughing-man/warai_flat.png", true);
    req.responseType = "blob";
    req.onload = function(this, ev) {
      blob = req.response;
    };
    req.send();
    */

    it('canvasへの画像表示・変換(顔認識なし)', inject([LaughingManService], (service: LaughingManService) => {
      expect(service.setCanvas(canvas)).toBeTruthy();
      expect(service.setImage(blob)).toBeTruthy();
      expect(service.convertImage()).toBeFalsy();
    }));

  });


});
