import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private _data: Subject<Object> = new Subject();
  private _dataStream$ = this._data.asObservable();

  private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();
  _state: any = {};

  constructor() {
    this._dataStream$.subscribe((data: any) => this._onEvent(data));
  }

  notifyDataChanged(event: string, value: any) {

    let current = (this._data as any)[event];
    if (current !== value) {
      (this._data as any)[event] = value;

      this._data.next({
        event: event,
        data: (this._data as any)[event]
      });
    }
  }

  subscribe(event: string, callback: Function) {
    let subscribers = this._subscriptions.get(event) || [];
    subscribers.push(callback);

    this._subscriptions.set(event, subscribers);
  }

  _onEvent(data: any) {
    let subscribers = this._subscriptions.get(data['event']) || [];

    subscribers.forEach((callback) => {
      callback.call(null, data['data']);
    });
  }

  get state() {
    return this._state = this.clone(this._state);
  }

  private clone(object: any) {
    return JSON.parse(JSON.stringify(object))
  }

  get(prop?: any) {
    const state = this.state;
    return state.hasOwnPropertyprop(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    return this._state[prop] = value;
  }
}
