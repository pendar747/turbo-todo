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
  async addTodoList () {
    const select = (list: TodoList) => {
      this.allLists.forEach(list => { 
        list.isSelected = false 
      });
      list.isSelected = true;
    }
    const list = new TodoList({ 
      name: this.name, 
      id: this.allLists.length.toString(), 
      date: new Date(), 
      todos: [],
      description: this.description
    }, select);
    this.allLists.push(list)
    this.description = '';
    this.name = '';
  }

  @action
  setName ({ value }: { value: string }) {
    this.name = value ?? '';
  }
  
  @action
  setDescription ({ value }: { value: string }) {
    this.description = value ?? '';
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

  @action
  selectList ({ params: { id }}: { params: { id: string }}) {
    this.allLists.forEach(list => {
      list.isSelected = list.id === id;
    })
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