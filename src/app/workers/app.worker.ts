import { SocketDataInterface } from '../types/socket-data.interface';
import { WorkerDataInterface } from '../types/worker-data.interface';

addEventListener('message', ({ data }) => {
  // send last 10 elements from initialArray to listener
  postMessage(makeResultArray(data as WorkerDataInterface));
});

export function makeResultArray(data: WorkerDataInterface): SocketDataInterface[] {
  if (data.initArray.length < 10) {
    return data.initArray;
  }

  const result: SocketDataInterface[] = [];
  const additionalIds = data.additionalIds;
  let additionalCounter = 0;
  let additionalIdArray = [];

  if (additionalIds) {
    // select and push additionalIds into resulting array
    additionalIdArray = (additionalIds as string).split(',');
    additionalIdArray.forEach(additionalId => {
      const additionalElement = data.initArray.find(initItem => initItem.id === additionalId.trim());
      if (additionalElement) {
        result.push(additionalElement);
        data.initArray.splice(data.initArray.indexOf(additionalElement), 1);
        additionalCounter++;
      }
    })
  }

  // select last N elements to display, based on already pushed additional elements count
  const resultTail: SocketDataInterface[] = data.initArray.slice(data.initArray.length - 10 + additionalCounter, data.initArray.length);

  return result.concat(resultTail);
}
