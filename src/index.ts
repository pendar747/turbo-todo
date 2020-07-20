import { runState } from '@pernix/mobx-adapter';
import State from './models/State.worker';
import '@pernix/core';

const stateWorker = new State() as unknown as Worker;
runState(stateWorker, 'main');