import { observable, action, computed, autorun } from 'mobx';

import TodoList from './TodoList';
import { registerState } from '@pendar/turbo/src/modelAdapters/mobX/index';

class ListCollection {
  @observable
  name = '';

  @observable
  description = '';

  @observable
  allLists: TodoList[] = [];

  @action
  async addTodoList ({ name, description }: { name: string, description: string }) {
    console.log('recieved action', { name, description });
    const select = (list: TodoList) => {
      this.allLists.forEach(list => { 
        list.isSelected = false 
      });
      list.isSelected = true;
    }
    const list = new TodoList({ 
      name, 
      id: this.allLists.length.toString(), 
      date: new Date(), 
      todos: [],
      description
    }, select);
    this.allLists.push(list)
    this.description = '';
    this.name = '';
  }
  
  @computed
  get visibleLists () {
    return this.allLists.filter(list => !list.isDeleted);
  }
  
  @computed
  get deletedLists () {
    return this.allLists.filter(list => list.isDeleted);
  }

  @action
  async clearAlDeletedLists () {
    this.allLists = this.visibleLists;
  }

  @computed
  get selectedList () {
    return this.allLists.find(list => list.isSelected);
  }
}

@registerState('main')
export default class IndexState {
  
  @observable
  lists: ListCollection = new ListCollection();

  @observable
  list: TodoList|null = null;    
}