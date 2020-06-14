import { observable, action, computed } from 'mobx';

import TodoList from './TodoList';
import { registerState } from '@pendar/turbo/src/modelAdapters/mobX/index';

@registerState('main')
export default class IndexState {
  @observable
  lists: TodoList[] = [];
  
  @observable
  list: TodoList|null = null;

  @observable
  author = {
    name: 'Pendar'
  };

  @action
  async addTodoList ({ name, description }: { name: string, description: string }) {
    console.log('recieved action', { name, description });
    const list = new TodoList({ 
      name, 
      id: this.lists.length.toString(), 
      date: new Date(), 
      todos: [],
      description
    });
    this.lists.push(list)
  }
  
  @computed
  get visibleLists () {
    return this.lists.filter(list => !list.isDeleted);
  }
  
  @computed
  get deletedLists () {
    return this.lists.filter(list => list.isDeleted);
  }

  @action
  async clearAlDeletedLists () {
    this.lists = this.visibleLists;
  }
}