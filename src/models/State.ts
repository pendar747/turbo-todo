import { observable, action } from 'mobx';
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
}