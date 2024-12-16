import { Injectable} from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private url = 'http://localhost:3000/';

  constructor() {
    this.socket = io(this.url);
  }

  getMessages(): Observable<{ emisor: string, mensaje: string, fecha: Date }> {
    return new Observable<{ emisor: string, mensaje: string, fecha: Date }>(observer => {

      this.socket.on('message', (data) => {
        console.log('Datos recibidos del socket antes de observer.next:', data);
        observer.next(data);
      });

      return () => {
        this.socket.off('message');
      };
    });
  }

  sendMessage(data: { emisor: string, mensaje: string, fecha: Date }) {
    this.socket.emit('message', data);
  }

  disconnectSocket() {
    this.socket.disconnect();
  }
  connectSocket() {
    if (this.socket && this.socket.disconnected) {
      this.socket.connect();
    } else if (!this.socket) {
      this.socket = io(this.url);
    }
  }
}
