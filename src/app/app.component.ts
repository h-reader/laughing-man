import { Component } from '@angular/core';
import { LoadingService } from './loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [LoadingService],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LauginMan Service!';
}
