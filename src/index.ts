import { runState } from '@pendar/turbo/src/modelAdapters/mobX/index';
import State from './models/State.worker';
import '@pendar/turbo';

const stateWorker = new State() as unknown as Worker;
runState(stateWorker, 'main');