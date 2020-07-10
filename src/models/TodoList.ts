import { observable, action, computed, autorun, toJS } from "mobx";
import Todo from "./Todo";
import { IList } from "./types";
import db from "./db";
import shortId from 'shortid';

export default class TodoList implements IList {
  @observable
  newTitle = '';

  @observable
  todos: Todo[] = [];

  @observable
  name: string;

  @observable
  description: string;

  @observable
  date: Date;

  @observable
  isDeleted: boolean = false;

  @observable
  isSelected: boolean = false;

  id: string;

  select: (list: TodoList) => void;

  constructor (props: IList, select: (list: TodoList) => void) {
    this.name = props.name;
    this.id = props.id;
    this.description = props.description;
    this.date = props.date; 
    this.select = select;
    this.isDeleted = props.isDeleted;
  }

  @computed
  get deletedTodos () {
    return this.todos.filter(todo => todo.isDeleted);
  }

  @computed
  get visibleTodos () {
    return this.todos.filter(todo => !todo.isDeleted);
  }

  @action
  viewList () {
    this.select(this);
  }

  @action
  clearDeletedTodos () {
    this.todos = this.visibleTodos;
  }

  @action
  setNewTitle ({ value }: { value: string }) {
    this.newTitle = value;
    this.save();
  }

  @action
  addNewTodo () {
    const todo = new Todo({ 
      title: this.newTitle, 
      date: new Date(), 
      id: shortId(),
      isDeleted: false,
      isDone: false,
      listId: this.id
    });
    this.todos.push(todo);
    this.newTitle = '';
    todo.save();
  }

  @action
  toggleAll () {
    this.todos.forEach(todo => {
      todo.isDone = !todo.isDone
      todo.save();
    });
  }

  @action
  deleteList () {
    this.isDeleted = true;
    this.save();
  }

  save () {
    return db.lists.put({
      date: this.date,
      description: this.description,
      id: this.id,
      isDeleted: this.isDeleted,
      name: this.name
    }, this.id);
  }

  async loadTodos () {
    const todos = await db.todos.where('listId').equals(this.id).toArray();
    this.todos = todos.map(todo => new Todo(todo));
  }
}