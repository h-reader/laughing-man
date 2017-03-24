import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

const Tracker = require('clmtrackr/clmtrackr.js');
const faceModel = require('clmtrackr/models/model_pca_20_svm.js');
const ccv = require('local_module/ccv.js');

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
    if(inputFile != null && inputFile.files != null && inputFile.files.length > 0) {
      this.showCanvas(this.dropCanvas.nativeElement, inputFile.files[0]);
    }
  }

  /**
   * 引数のキャンバスに画像イメージを表示する。
   * @param canvas 表示対象のキャンバス
   * @param blob 画像イメージ
   */
  private showCanvas(canvas : HTMLCanvasElement, blob: Blob) {
    // ファイルを読込み
    var ctx = canvas.getContext('2d');
    var reader = new FileReader();
    var image = new Image();
    reader.onload = (function(theFile) {
      image.onload = function() {
        ctx.drawImage(image, 0, 0);
      }
      image.src = this.result;
    });
    reader.readAsDataURL(blob);
  }
}
