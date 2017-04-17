import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoadingService {

  public loadingChange: EventEmitter<boolean> = new EventEmitter();
  
  private _isLoading: boolean;

  constructor() {
    this._isLoading = false;
   }

  public startLoading() {
    this._isLoading = true;
    this.loadingChange.emit(this._isLoading);
  }

  public endLoading() {
    this._isLoading = false;
    this.loadingChange.emit(this._isLoading);
  }

  public isLoading(): boolean {
    return this._isLoading;
  }

}
