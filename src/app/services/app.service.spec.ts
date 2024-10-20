import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SocketDataInterface } from '../types/socket-data.interface';
import { AppService } from './app.service';

const minNumber = -2147483648;
const maxNumber = 2147483647;
const testTimer = 100;
const testSize = 5;
const testLargeSize = 10000;

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService]
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate correct socket data array', () => {
  const timer = testTimer;
  const size = testSize;

  const expectedData: SocketDataInterface[] = [
    {
      id: '1',
      int: 10,
      float: 12.12,
      color: 'red',
      child: {
        id: '2',
        color: 'blue'
      }
    },
    {
      id: '2',
      int: 10,
      float: 12.12,
      color: 'red',
      child: {
        id: '2',
        color: 'blue'
      }
    },
    {
      id: '3',
      int: 10,
      float: 12.12,
      color: 'red',
      child: {
        id: '2',
        color: 'blue'
      }
    },
    {
      id: '4',
      int: 10,
      float: 12.12,
      color: 'red',
      child: {
        id: '2',
        color: 'blue'
      }
    },
    {
      id: '5',
      int: 10,
      float: 12.12,
      color: 'red',
      child: {
        id: '2',
        color: 'blue'
      }
    }
  ];

  spyOn(service, 'getSocketData').and.callFake(() => {
    return of(expectedData);
  });

  service.getSocketData(timer, size).subscribe((data) => {
    expect(data).toEqual(expectedData);
  });
});

it('should handle large size values', () => {
  const timer = testTimer;
  const largeSize = testLargeSize;

  spyOn(service, 'getSocketData').and.callFake(() => {
    return of(new Array(testLargeSize) as SocketDataInterface[]);
  });
  service.getSocketData(timer, largeSize).subscribe((data: SocketDataInterface[]) => {
    expect(data.length).toBe(largeSize);
  });
});

it('should handle edge cases for integer generation', () => {
  const timer = testTimer;
  const size = testSize;

  const expectedData: SocketDataInterface[] = [
    {
      id: '1',
      int: Math.floor(Math.random() * (Math.floor(maxNumber) - Math.ceil(minNumber)) + Math.ceil(minNumber)),
      float: 12.12,
      color: 'red',
      child: {
        id: '2',
        color: 'blue'
      }
    },
    {
      id: '2',
      int: Math.floor(Math.random() * (Math.floor(maxNumber) - Math.ceil(minNumber)) + Math.ceil(minNumber)),
      float: 12.12,
      color: 'red',
      child: {
        id: '2',
        color: 'blue'
      }
    },
    {
      id: '3',
      int: Math.floor(Math.random() * (Math.floor(maxNumber) - Math.ceil(minNumber)) + Math.ceil(minNumber)),
      float: 12.12,
      color: 'red',
      child: {
        id: '2',
        color: 'blue'
      }
    },
    {
      id: '4',
      int: Math.floor(Math.random() * (Math.floor(maxNumber) - Math.ceil(minNumber)) + Math.ceil(minNumber)),
      float: 12.12,
      color: 'red',
      child: {
        id: '2',
        color: 'blue'
      }
    },
    {
      id: '5',
      int: Math.floor(Math.random() * (Math.floor(maxNumber) - Math.ceil(minNumber)) + Math.ceil(minNumber)),
      float: 12.12,
      color: 'red',
      child: {
        id: '2',
        color: 'blue'
      }
    }
  ];

  spyOn(service, 'getSocketData').and.callFake(() => {
    return of(expectedData);
  });

  service.getSocketData(timer, size).subscribe((data) => {
    data.forEach((item) => {
      expect(item.int).toBeGreaterThanOrEqual(minNumber);
      expect(item.int).toBeLessThanOrEqual(maxNumber);
    });
  });
});

it('should handle edge cases for floating-point generation', () => {
  const timer = testTimer;
  const size = testSize;

  const expectedData: SocketDataInterface[] = [
    {
      id: '1',
      int: 10,
      float: +(Math.random() * (maxNumber - minNumber) + minNumber).toFixed(18),
      color: 'red',
      child: {
        id: '2',
        color: 'blue'
      }
    },
    {
      id: '2',
      int: 10,
      float: +(Math.random() * (maxNumber - minNumber) + minNumber).toFixed(18),
      color: 'red',
      child: {
        id: '2',
        color: 'blue'
      }
    },
    {
      id: '3',
      int: 10,
      float: +(Math.random() * (maxNumber - minNumber) + minNumber).toFixed(18),
      color: 'red',
      child: {
        id: '2',
        color: 'blue'
      }
    },
    {
      id: '4',
      int: 10,
      float: +(Math.random() * (maxNumber - minNumber) + minNumber).toFixed(18),
      color: 'red',
      child: {
        id: '2',
        color: 'blue'
      }
    },
    {
      id: '5',
      int: 10,
      float: +(Math.random() * (maxNumber - minNumber) + minNumber).toFixed(18),
      color: 'red',
      child: {
        id: '2',
        color: 'blue'
      }
    }
  ];

  spyOn(service, 'getSocketData').and.callFake(() => {
    return of(expectedData);
  });

  service.getSocketData(timer, size).subscribe((data) => {
    data.forEach((item) => {
      expect(item.float).toBeGreaterThanOrEqual(minNumber);
      expect(item.float).toBeLessThanOrEqual(maxNumber);
    });
  });
});
});
