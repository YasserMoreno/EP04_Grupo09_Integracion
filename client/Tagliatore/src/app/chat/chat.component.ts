import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChatService } from '../services/chatService/chat.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() dni?: string;
  messages: { emisor: string, mensaje: string, fecha: Date }[] = [];
  newMessage: string = '';
  private messageSubscription!: Subscription;
  emisor: string = '';
  imageSrc: string = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.emisor = this.dni ? `Cliente #${this.dni}` : 'Mesero';

    this.chatService.connectSocket();

    this.messageSubscription = this.chatService.getMessages().subscribe(
      (message: { emisor: string, mensaje: string, fecha: Date }) => {
        this.messages.push(message);
      }
    );
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
    this.chatService.disconnectSocket();
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.chatService.sendMessage({
        emisor: this.emisor,
        mensaje: this.newMessage,
        fecha: new Date()
      });
      this.newMessage = '';
    }
  }
}
