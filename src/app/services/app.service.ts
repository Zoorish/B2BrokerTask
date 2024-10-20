import { Injectable } from '@angular/core';
import { exhaustMap, interval, of } from 'rxjs';
import { SocketDataInterface } from '../types/socket-data.interface';

const minNumber = -2147483648; // take for example as min int value
const maxNumber = 2147483647; // take for example as max int value
const colorList = ['red', 'blue', 'green', 'gray', 'violet', 'yellow', 'orange', 'brown', 'pink', 'purple'];

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // emulates socket data sending behaviour with interval transmission
  public getSocketData(timer: number, size: number) {
    return interval(timer).pipe(exhaustMap(() => of(this.generateSourceArray(size))));
  }

  // generates initial array with random content
  private generateSourceArray(size: number): SocketDataInterface[] {
    const result = [];
    for (let i = 0; i < size; i++) {
      const resultItem = {
        id: i.toString(),
        int: this.generateInt(),
        float: this.generateFloat(),
        color: this.generateColor(),
        child: {
          id: i.toString(),
          color: this.generateColor(),
        }
      };
      result.push(resultItem);
    }
    return result;
  }

  // can be from −2 147 483 648 to 2 147 483 647, returns int number
  private generateInt(): number {
    return Math.floor(Math.random() * (Math.floor(maxNumber) - Math.ceil(minNumber)) + Math.ceil(minNumber));
  }

  // can be from −2 147 483 648 to 2 147 483 647, returns float number with max precision of 18
  private generateFloat(): number {
    return +(Math.random() * (maxNumber - minNumber) + minNumber).toFixed(18);
  }

  // return string color value based on initial color array
  private generateColor(): string {
    return colorList[Math.floor(Math.random() * colorList.length)];
  }
}
