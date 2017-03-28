import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

require('tracking');
require('tracking/build/data/face-min');

@Component({
  selector: 'app-laughing-man',
  templateUrl: './laughing-man.component.html',
  styleUrls: ['./laughing-man.component.scss']
})


export class LaughingManComponent implements OnInit {

  /** 画像選択後に表示するキャンバス */
  @ViewChild('dropCanvas') dropCanvas;

  constructor() { }

  ngOnInit() {
  }

  /**
   * inputで選択したファイルをcanvas上に表示する。
   * @param inputFile 画像ファイルを選択したinput
   */
  public showImage4Canvas(inputFile: HTMLInputElement) {
    if (inputFile != null && inputFile.files != null && inputFile.files.length > 0) {
      this.showCanvas(this.dropCanvas.nativeElement, inputFile.files[0]);
    }
  }

  /**
   * 引数のキャンバスに画像イメージを表示する。
   * @param canvas 表示対象のキャンバス
   * @param blob 画像イメージ
   */
  private showCanvas(canvas: HTMLCanvasElement, blob: Blob) {
    // ファイルを読込み
    const ctx = canvas.getContext('2d');
    const reader = new FileReader();
    const image = new Image();
    reader.onload = (function(theFile) {
      image.onload = function() {
        ctx.drawImage(image, 0, 0);
      };
      image.src = this.result;
    });
    reader.readAsDataURL(blob);
  }

  public convertImage() {

    const tracker = new tracking.ObjectTracker(['face']);

    tracker.on('track', (event) => {
      if (event.data.length === 0) {
        // No objects were detected in this frame.
      } else {
        event.data.forEach((rect) => {
          console.log(rect);
          // rect.x, rect.y, rect.height, rect.width
        });
      }
    });

    tracking.track('#dropCanvas', tracker);
  }

}
