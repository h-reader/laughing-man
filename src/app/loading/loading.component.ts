import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @Input() isShow: boolean;

  constructor(private service: LoadingService) { }

  ngOnInit() {
    this.isShow = false;
    this.service.loadingChange.subscribe((value) => {
      this.isShow = value;
    });
  }


}
