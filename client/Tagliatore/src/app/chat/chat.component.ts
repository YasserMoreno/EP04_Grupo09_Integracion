import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChatService } from '../services/chatService/chat.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/loginService/login.service';

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
  clienteVSMesero: string = '';
  isLoggedInUser: boolean = false;
  loggedInUserName: string | null = null;



  constructor(private chatService: ChatService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.isLoggedInUser = this.loginService.isLoggedIn();
    if (this.isLoggedInUser) {
      this.loggedInUserName = this.loginService.getNombre();
      this.clienteVSMesero = 'mesero'
    } else {
      this.clienteVSMesero = 'cliente'
    }
    this.emisor = this.clienteVSMesero === 'mesero' ? `Mesero ${this.loggedInUserName}` : `Cliente #${this.dni}` ;

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
