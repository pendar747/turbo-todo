import { observable } from 'mobx';

import TodoList from './TodoList';
import { registerState } from '@pendar/turbo/src/modelAdapters/mobX/index';
import ListCollection from './ListCollection';


@registerState('main')
export default class IndexState {
  
  @observable
  lists: ListCollection;

  @observable
  list: TodoList|null = null;    

  constructor () {
    this.lists = new ListCollection()
  }
  
}