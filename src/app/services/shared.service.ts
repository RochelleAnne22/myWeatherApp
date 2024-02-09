import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _isAddLocationVisible = new BehaviorSubject<boolean>(false);
  isAddLocationVisible$ = this._isAddLocationVisible.asObservable();
  private _isAddLocationRoute = new BehaviorSubject<boolean>(false);
  isAddLocationRoute$ = this._isAddLocationRoute.asObservable();

  showAddLocation() {
    this._isAddLocationVisible.next(true);
  }

  hideAddLocation() {
    this._isAddLocationVisible.next(false);
  }

  setAddLocationRoute(isAddLocationRoute: boolean) {
    this._isAddLocationRoute.next(isAddLocationRoute);
  }
}