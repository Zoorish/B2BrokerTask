import { makeResultArray } from './app.worker';
import { WorkerDataInterface } from '../types/worker-data.interface';
import { SocketDataInterface } from '../types/socket-data.interface';

const initBigArray: SocketDataInterface[] = [
  { id: '1', int: 10, float: 12.34, color: 'red', child: { id: '1.1', color: 'blue' } }, // This element won't be included in the result
  { id: '2', int: 20, float: 56.78, color: 'green', child: { id: '2.1', color: 'yellow' } },
  { id: '3', int: 30, float: 12.34, color: 'blue', child: { id: '1.1', color: 'blue' } },
  { id: '4', int: 40, float: 56.78, color: 'green', child: { id: '2.1', color: 'yellow' } },
  { id: '5', int: 50, float: 12.34, color: 'yellow', child: { id: '1.1', color: 'blue' } },
  { id: '6', int: 60, float: 12.34, color: 'pink', child: { id: '1.1', color: 'yellow' } },
  { id: '7', int: 70, float: 12.34, color: 'violet', child: { id: '1.1', color: 'blue' } },
  { id: '8', int: 80, float: 12.34, color: 'brown', child: { id: '1.1', color: 'yellow' } },
  { id: '9', int: 90, float: 12.34, color: 'green', child: { id: '1.1', color: 'blue' } },
  { id: '10', int: 100, float: 12.34, color: 'red', child: { id: '1.1', color: 'yellow' } },
  { id: '11', int: 110, float: 12.34, color: 'blue', child: { id: '1.1', color: 'blue' } },
];

const initBigArrayTail: SocketDataInterface[] = [
  { id: '2', int: 20, float: 56.78, color: 'green', child: { id: '2.1', color: 'yellow' } },
  { id: '3', int: 30, float: 12.34, color: 'blue', child: { id: '1.1', color: 'blue' } },
  { id: '4', int: 40, float: 56.78, color: 'green', child: { id: '2.1', color: 'yellow' } },
  { id: '5', int: 50, float: 12.34, color: 'yellow', child: { id: '1.1', color: 'blue' } },
  { id: '6', int: 60, float: 12.34, color: 'pink', child: { id: '1.1', color: 'yellow' } },
  { id: '7', int: 70, float: 12.34, color: 'violet', child: { id: '1.1', color: 'blue' } },
  { id: '8', int: 80, float: 12.34, color: 'brown', child: { id: '1.1', color: 'yellow' } },
  { id: '9', int: 90, float: 12.34, color: 'green', child: { id: '1.1', color: 'blue' } },
  { id: '10', int: 100, float: 12.34, color: 'red', child: { id: '1.1', color: 'yellow' } },
  { id: '11', int: 110, float: 12.34, color: 'blue', child: { id: '1.1', color: 'blue' } },
];

describe('makeResultArray', () => {
  it('should return the original array if its length is less than 10', () => {
    const data: WorkerDataInterface = {
      initArray: [
        { id: '1', int: 10, float: 12.34, color: 'red', child: { id: '1.1', color: 'blue' } },
        { id: '2', int: 20, float: 56.78, color: 'green', child: { id: '2.1', color: 'yellow' } },
      ],
      additionalIds: '',
    };

    const result = makeResultArray(data);

    expect(result).toBe(data.initArray);
  });

  it('should return a combined array of last 10 elements with additional elements if initArray is longer than 10', () => {
    const data: WorkerDataInterface = {
      initArray: initBigArray.slice(),
      additionalIds: '3, 7',
    };

    const expectedResult: SocketDataInterface[] = [
      { id: '3', int: 30, float: 12.34, color: 'blue', child: { id: '1.1', color: 'blue' } },
      { id: '7', int: 70, float: 12.34, color: 'violet', child: { id: '1.1', color: 'blue' } },
      { id: '2', int: 20, float: 56.78, color: 'green', child: { id: '2.1', color: 'yellow' } },
      { id: '4', int: 40, float: 56.78, color: 'green', child: { id: '2.1', color: 'yellow' } },
      { id: '5', int: 50, float: 12.34, color: 'yellow', child: { id: '1.1', color: 'blue' } },
      { id: '6', int: 60, float: 12.34, color: 'pink', child: { id: '1.1', color: 'yellow' } },
      { id: '8', int: 80, float: 12.34, color: 'brown', child: { id: '1.1', color: 'yellow' } },
      { id: '9', int: 90, float: 12.34, color: 'green', child: { id: '1.1', color: 'blue' } },
      { id: '10', int: 100, float: 12.34, color: 'red', child: { id: '1.1', color: 'yellow' } },
      { id: '11', int: 110, float: 12.34, color: 'blue', child: { id: '1.1', color: 'blue' } },
    ];

    const result = makeResultArray(data);

    expect(result).toEqual(expectedResult);
  });

  it('should handle cases where additional elements are not found in the initArray', () => {
    const data: WorkerDataInterface = {
      initArray: initBigArray.slice(),
      additionalIds: '13, 17',
    };

    const expectedResult = initBigArrayTail;

    const result = makeResultArray(data);

    expect(result).toEqual(expectedResult);
  });

  it('should handle empty additionalIds', () => {
    const data: WorkerDataInterface = {
      initArray: initBigArray.slice(),
      additionalIds: '',
    };

    const expectedResult = initBigArrayTail;

    const result = makeResultArray(data);

    expect(result).toEqual(expectedResult);
  });
});
