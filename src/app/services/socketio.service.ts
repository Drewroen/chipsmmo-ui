import { Constants } from './../../constants/constants';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io, Socket} from 'socket.io-client';
import * as lz from 'lz-string';
import { GAME_ROOMS } from 'src/objects/room';

@Injectable()
export class SocketIOService {
  private socket: Socket;

  constructor() {
    this.socket = io(
      environment.socketUrl
    );
  }

  sendData(socketEvent: string, data: any) {
    this.socket.emit(socketEvent, data);
  }

  getData(socketEvent: string) {
    return new Observable(observer => {
      this.socket.on(socketEvent, msg => {
        if(socketEvent === Constants.SOCKET_EVENT_UPDATE_GAME_MAP_FULL || socketEvent === Constants.SOCKET_EVENT_UPDATE_GAME_MAP_DELTA)
          msg = lz.decompress(msg);
        observer.next(msg);
      });
    });
  }

  getSocketId(): string {
    return this.socket.id;
  }

  joinRoom(roomName: string): void {
    const roomNumber = GAME_ROOMS.map(room => room.name).indexOf(roomName);
    this.sendData(Constants.SOCKET_EVENT_JOIN_ROOM, roomNumber);
  }
}
