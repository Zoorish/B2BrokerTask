import { SocketDataChildInterface } from './socket-data-child.interface';

export interface SocketDataInterface {
  id: string;
  int: number;
  float: number;
  color: string;
  child: SocketDataChildInterface;
}
