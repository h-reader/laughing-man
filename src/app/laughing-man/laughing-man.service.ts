import { Injectable } from '@angular/core';

require('tracking');
require('tracking/build/data/face-min');

@Injectable()
export class LaughingManService {

  private canvas: HTMLCanvasElement;

  constructor() { }

  public setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  /**
   * 引数のキャンバスに画像イメージを表示する。
   * @param blob 画像イメージ
   */
  public setImage(blob: Blob): boolean {

    // キャンバスが設定されていない場合エラー
    if(!this.isSetCanvas()) { 
      return false;
    }

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

  
  public convertImage() {

    const tracker = new tracking.ObjectTracker(['face']);

    tracker.on('track', (event) => {
      if (event.data.length === 0) {
        // No objects were detected in this frame.
        console.log('Sorry! Can not find face!');
      } else {
        event.data.forEach((rect) => {
          console.log(rect);
          this.convertLaughingMan(rect);
          // rect.x, rect.y, rect.height, rect.width
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
  private clearCanvas(): boolean {
    if(!this.isSetCanvas()) { 
      return false;
    }
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private convertLaughingMan(rect: tracking.TrackRect): boolean {
    
    if(!this.isSetCanvas()) { 
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
