import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LaughingManService } from './laughing-man.service';


@Component({
  selector: 'app-laughing-man',
  templateUrl: './laughing-man.component.html',
  providers: [LaughingManService],
  styleUrls: ['./laughing-man.component.scss']
})


export class LaughingManComponent implements OnInit {
  
  /** 画像選択後に表示するキャンバス */
  @ViewChild('dropCanvas') dropCanvas;

  /** コンストラクタ */
  constructor(private laughingManService: LaughingManService) { }

  ngOnInit() {
  }

  /**
   * inputで選択したファイルをcanvas上に表示する。
   * @param inputFile 画像ファイルを選択したinput
   */
  public showImage4Canvas(inputFile: HTMLInputElement) {
    if (inputFile != null && inputFile.files != null && inputFile.files.length > 0) {

      this.laughingManService.setCanvas(this.dropCanvas.nativeElement);
      this.laughingManService.setImage(inputFile.files[0]);
    }
  }

  /**
   * ロードした画像の顔部分を変更する
   */
  public convertImage() {
    this.laughingManService.convertImage();
  }

  /**
   * キャンバスにイメージがセットされているか
   */
  public isSetImage(): boolean {
    return (this.laughingManService.isSetImage());
  }
}
