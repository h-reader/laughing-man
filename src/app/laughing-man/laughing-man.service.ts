import { Injectable } from '@angular/core';

require('tracking');
require('tracking/build/data/face-min');

@Injectable()
export class LaughingManService {

  /** 画像変換用のcanvas */
  private canvas: HTMLCanvasElement;

  constructor() { }

  /**
   * 対象のキャンバスをセットする。
   * @param canvas 画像変換用の対象キャンバス
   */
  public setCanvas(canvas: HTMLCanvasElement): boolean {
    if(canvas == null) {
      return false;
    }
    this.canvas = canvas;
    return true;
  }

  /**
   * 引数のキャンバスに画像イメージを表示する。
   * @param blob 画像イメージ
   */
  public setImage(blob: Blob): boolean {

    // キャンバスが設定されていない場合異常終了
    if (!this.isSetCanvas()) {
      return false;
    }

    // キャンバス情報を一度クリアする
    this.clearCanvas();

    // blobデータをcanvasに書き込み
    const ctx = this.canvas.getContext('2d');
    const canvas = this.canvas;
    const reader = new FileReader();
    const image = new Image();
    reader.onload = (function(theFile) {
      image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);
      };
      image.src = this.result;
    });
    reader.readAsDataURL(blob);
    return true;
  }

  /**
   * 対象のキャンバスを顔認識させ、認識した顔情報を
   * 笑い男に置き換える。
   */
  public convertImage() {

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
    });

    tracking.track('#dropCanvas', tracker);
  }


  /**
   * キャンバスがセットされているどうか
   */
  private isSetCanvas(): boolean {

    return this.canvas != null;
  }

  /**
   * キャンバスの描画内容をクリアする
   */
  private clearCanvas() {

    // キャンバスがセットされていなければ終了する
    if (!this.isSetCanvas()) {
      return;
    }
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * 顔認識した座標情報からキャンバス内の顔情報を笑い男で上書きする
   */
  private convertLaughingMan(rect: tracking.TrackRect): boolean {

    // キャンバスが存在しない場合異常終了とする
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

}
