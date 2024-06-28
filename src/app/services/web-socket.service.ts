// websocket.service.ts
import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: Client;
  private messages: any[] = [];

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:1010/ws'),
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = (frame) => {
      this.client.subscribe('/topic/messages', (message) => {
        console.log(JSON.parse(message.body));
        this.messages.push(JSON.parse(message.body));
      });
    };

    this.client.activate();
  }

  getMessages(): any[] {
    return this.messages;
  }
}
