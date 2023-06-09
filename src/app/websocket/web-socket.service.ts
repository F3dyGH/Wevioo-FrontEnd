import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {webSocket} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  webSocketUrl: string;
  socket$: Observable<any>;
  constructor() {
    this.webSocketUrl = environment.websocket + "notifications"
    this.socket$ = webSocket(this.webSocketUrl);
  }
  public connect(): Observable<any> {
    return this.socket$;
  }
}
