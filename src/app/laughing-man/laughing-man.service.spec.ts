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

  describe('正常系', () => {
    const canvas = document.createElement("canvas");
    let blob: Blob = new Blob();

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

    it('canvasが正常に設定できるか', inject([LaughingManService], (service: LaughingManService) => {
      expect(service.setCanvas(canvas)).toBeTruthy();
    }));

    console.log(blob);

    

  });


});
