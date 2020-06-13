import { observable, action, computed } from 'mobx';
import uuid from 'uuid';

import TodoList from './TodoList';
import storage from './storage';
import { registerState } from '@pendar/turbo/src/modelAdapters/mobX/index';

@registerState('main')
export default class IndexState {
  @observable
  lists: TodoList[] = [];
  
  @observable
  list: TodoList|null = null;

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
  
  @action
  async init({ path, param: id }: { path: string, param: string }) {
    if (path.indexOf('/list') == 0) {
      const listProps = await storage.getList(id);
      if (listProps) {
        this.list = new TodoList(listProps);
      }
    }
    const lists = await storage.getAllLists();
    this.lists = lists.map(props => new TodoList(props));
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