import { observable, action, computed } from 'mobx';
import uuid from 'uuid';

import TodoList from './TodoList';
import storage from './storage';

export default class IndexState {
  @observable
  lists: TodoList[] = [];

  @action
  async addTodoList ({ name, description }: { name: string, description: string }) {
    const list = new TodoList({ 
      name, 
      id: uuid.v4(), 
      date: new Date(), todos: [],
      description
    });
    this.lists.push(list)
    await storage.addList(list);
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
    for (let index = 0; index < this.deletedLists.length; index++) {
      await storage.deleteList(this.deletedLists[index].id);      
    }
    this.lists = this.visibleLists;
  }
}