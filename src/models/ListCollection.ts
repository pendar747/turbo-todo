import { observable, action, computed } from 'mobx';
import TodoList from './TodoList';
import db from './db';
import uniqueId from 'lodash/uniqueId';

export default class ListCollection {
  @observable
  name = '';

  @observable
  description = '';

  @observable
  allLists: TodoList[] = [];

  hasLoaded: boolean = false;

  constructor () {
    this.loadAllLists();
  }
  
  select = (list: TodoList) => {
    this.allLists.forEach(list => { 
      list.isSelected = false 
    });
    list.isSelected = true;
  }

  async loadAllLists () {
    if (!this.hasLoaded) {
      const lists = await db.lists.toArray();
      console.log(lists);
      this.allLists = lists.map(listProps => {
        return new TodoList({ ...listProps, todos: [] }, this.select);
      });
      this.allLists.forEach(list => list.loadTodos());
      this.hasLoaded = true;
    }
  }

  @action
  async addTodoList () {
    const list = new TodoList({ 
      name: this.name, 
      id: uniqueId(), 
      date: new Date(), 
      todos: [],
      description: this.description,
      isDeleted: false
    }, this.select);
    this.allLists.push(list)
    this.description = '';
    this.name = '';
    list.save();
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
  async selectList ({ params: { id }}: { params: { id: string }}) {
    await this.loadAllLists();
    this.allLists.forEach(list => {
      list.isSelected = list.id === id;
    })
  }

  @computed
  get selectedList () {
    return this.allLists.find(list => list.isSelected);
  }
}