import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  public createMessage(senderId: number, receiverId: number, content: string) {
    const params = new HttpParams()
      .set('senderId', senderId.toString())
      .set('receiverId', receiverId.toString())
      .set('content', content);
    return this.http.post(`${baseUrl}/messages`, null, { params });
  }

  public getMessages(senderId: number, receiverId: number) {
    const params = new HttpParams()
      .set('senderId', senderId.toString())
      .set('receiverId', receiverId.toString());
    return this.http.get(`${baseUrl}/messages`, { params });
  }
}
