import { Injectable } from '@angular/core';
import { LoadingService } from '../loading/loading.service';

require('tracking');
require('tracking/build/data/face-min');

module myConst {
  /** canvasの最大サイズ */
  export const canvasMaxSize: number = 1000;
}


@Injectable()
export class LaughingManService {

  /** 画像変換用のcanvas */
  private canvas: HTMLCanvasElement;
  /** canvasに描画するイメージ */
  private loadImage: HTMLImageElement;

  constructor(private loadingService: LoadingService) { }

  /**
   * 対象のcanvasをセットする。
   * @param canvas 画像変換用の対象canvas
   */
  public setCanvas(canvas: HTMLCanvasElement): boolean {
    if (canvas == null) {
      return false;
    }
    this.canvas = canvas;
    return true;
  }

  /**
   * canvasに画像イメージを表示する。
   * @param blob 画像イメージ
   */
  public setImage(blob: Blob): boolean {

    // canvasが設定されていない場合異常終了
    if (!this.isSetCanvas()) {
      return false;
    }

    // canvas情報を一度クリアする
    this.clearCanvas();

    // blobデータをcanvasに書き込み
    const ctx = this.canvas.getContext('2d');
    const canvas = this.canvas;
    this.loadImage = new Image();
    const loadImage = this.loadImage;
    const reader = new FileReader();
    const self = this;

    reader.onload = (function(theFile) {
      loadImage.onload = function() {

        // canvasサイズを変更
        self.resizeCanvas(loadImage);
        // canvasに画像を表示
        ctx.drawImage(loadImage, 0, 0, canvas.width, canvas.height);

      };
      loadImage.src = this.result;
    });
    reader.readAsDataURL(blob);
    return true;
  }

  /**
   * 対象のcanvasを顔認識させ、認識した顔情報を
   * 笑い男に置き換える。
   */
  public convertImage() {

    this.loadingService.startLoading();

    this.execAsync(this.asyncConvertImage);


/*
    const tracker = new tracking.ObjectTracker(['face']);

    tracker.on('track', (event) => {
      if (event.data.length === 0) {
        // 顔画像が見つからない場合.
        console.log('Sorry! Can not find face!');
      } else {
        event.data.forEach((rect) => {
          // 顔画像が見つかった場合
          this.convertLaughingMan(rect);
        });
      }
      this.loadingService.disableLoading();
    });

    tracking.track('#dropCanvas', tracker);
    */
  }


  private execAsync(func: Function) {
    // ローディング画像表示
    this.loadingService.startLoading();

    const promise = new Promise((resolve) => {

      setTimeout(() => {
        // 内部処理実行
        func(this);
        // 正常終了後の処理
        resolve();
      }, 0);

    }).then(() => {
     // ローディング画像非表示
     this.loadingService.endLoading();
    });
  }

  private asyncConvertImage(service: LaughingManService) {

    const tracker = new tracking.ObjectTracker(['face']);

    tracker.on('track', (event) => {
      if (event.data.length === 0) {
        // 顔画像が見つからない場合.
        console.log('Sorry! Can not find face!');
      } else {
        event.data.forEach((rect) => {
          // 顔画像が見つかった場合
          service.convertLaughingMan(rect);
        });
      }
      console.log("変換終了");
    });

    tracking.track('#dropCanvas', tracker);

/*


    return new Promise(() => {
      const tracker = new tracking.ObjectTracker(['face']);

      tracker.on('track', (event) => {
        if (event.data.length === 0) {
          // 顔画像が見つからない場合.
          console.log('Sorry! Can not find face!');
        } else {
          event.data.forEach((rect) => {
            // 顔画像が見つかった場合
            this.convertLaughingMan(rect);
          });
        }
        this.loadingService.disableLoading();
      });

      tracking.track('#dropCanvas', tracker);
    });

*/
  }

  /**
   * canvasにイメージがセットされているか否か
   */
  public isSetImage(): boolean {
    return this.canvas != null && this.loadImage != null;
  }

  /**
   * canvasがセットされているどうか
   */
  private isSetCanvas(): boolean {
    return this.canvas != null;
  }

  /**
   * canvasの描画内容をクリアする
   */
  private clearCanvas() {

    // canvasがセットされていなければ終了する
    if (!this.isSetCanvas()) {
      return;
    }
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.loadImage = null;
  }

  /**
   * 顔認識した座標情報からcanvas内の顔情報を笑い男で上書きする
   */
  private convertLaughingMan(rect: tracking.TrackRect): boolean {

    // canvasが存在しない場合異常終了とする
    if (!this.isSetCanvas()) {
      return false;
    }

    const image = new Image();
    image.src = '../../assets/laughing-man/warai_flat.png';

    const ctx = this.canvas.getContext('2d');
    image.onload = function() {
        ctx.drawImage(image, rect.x, rect.y, rect.width, rect.height);
      };

  }

  /**
   * canvasのサイズを読み込んだ画像に応じて変更します。
   * 最大サイズを超えた場合、最大サイズに合わせてcanvasサイズを補正します。
   * @param loadImage 読み込んだ画像
   */
  private resizeCanvas(loadImage: HTMLImageElement) {
    const canvas = this.canvas;
    if (loadImage.width <= myConst.canvasMaxSize && loadImage.height <= myConst.canvasMaxSize) {
        // 読み込んだ画像が最大サイズを超えない場合、canvasサイズは画像のサイズとする
        canvas.width = loadImage.width;
        canvas.height = loadImage.height;
        return;
    }

    // 最大サイズを超えた画像を読み込んだ場合、最大サイズに収まるようにcanvasサイズを調整
    const magnification = (loadImage.width > loadImage.height ? loadImage.width : loadImage.height)
                          / myConst.canvasMaxSize;
    canvas.width = Math.floor(loadImage.width / magnification);
    canvas.height = Math.floor(loadImage.height / magnification);
  }
}
