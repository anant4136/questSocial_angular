import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MessagesService } from '../../../services/messages.service';
import { ActivatedRoute } from '@angular/router';
import { UserloginService } from '../../../services/userlogin.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  user: any;
  receiver: any = {};
  messages: any[] = [];
  old_messages: any[] = [];
  newMessage: string = '';
  messageSubscription: Subscription | undefined;
  fetchMessagesTimer: Subscription | undefined;

  constructor(
    private messagesService: MessagesService,
    private _route: ActivatedRoute,
    private login: UserloginService
  ) { }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.receiver.id = this._route.snapshot.params['id'];
    this.login.getUserById(this.receiver.id).subscribe(
      (data:any)=>
        {
          this.receiver = data;
          console.log(data);
        }
        ,(err)=>
          {
            console.log(err)
          }
    );
    if (!this.user || !this.receiver) {
      console.error("User or receiver data not provided.");
      return;
    }
    this.fetchOldMessages();
    this.startFetchMessagesTimer();
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    this.stopFetchMessagesTimer();
  }

  private fetchOldMessages(): void {
    this.messagesService.getMessages(this.user.id, this.receiver.id).subscribe((data: any) => {
      this.old_messages = data;
    });
  }

  private startFetchMessagesTimer(): void {
    this.fetchMessagesTimer = interval(1000) // 10 seconds interval
      .pipe(
        switchMap(() => this.messagesService.getMessages(this.user.id, this.receiver.id))
      )
      .subscribe((data: any) => {
        this.old_messages = data;
      });
  }

  private stopFetchMessagesTimer(): void {
    if (this.fetchMessagesTimer) {
      this.fetchMessagesTimer.unsubscribe();
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim() === '') return;

    this.messagesService.createMessage(this.user.id, this.receiver.id, this.newMessage).subscribe(() => {
      this.newMessage = '';
      // Update old_messages with the new message
      this.old_messages.push({
        senderId: this.user.id,
        receiverId: this.receiver.id,
        message: this.newMessage
      });
    }, (error) => {
      console.error("Error sending message:", error);
    });
  }
  isNavbarReduced = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const chatContainer = document.querySelector('.chat-container') as HTMLElement;
    const chatWindow = document.querySelector('.chat-window') as HTMLElement;

    // Adjust the top position based on scroll position
    const newTop = Math.max(103 - scrollPosition, 20); // Ensuring the top doesn't go above 0
    chatContainer.style.top = `${newTop}px`;
    const newHeight = Math.min(700 , 620 + scrollPosition)   ; // Ensuring the top doesn't go above 0
    chatContainer.style.height = `${newHeight}px`;
    
    this.isNavbarReduced = scrollPosition > (window.innerHeight * 0.2);
  }

}
