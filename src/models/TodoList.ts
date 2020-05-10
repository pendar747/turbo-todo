import { observable, action, computed } from "mobx";
import Todo from "./Todo";
import uuid from 'uuid';
import { IList } from "./types";
import storage from "./storage";

export default class TodoList {
  @observable
  newTodo: Todo = new Todo({ title: '', description: '', date: new Date(), id: uuid.v4() });

  @observable
  todos: Todo[] = [];

  @observable
  name: string;

  @observable
  description: string;

  @observable
  date: Date;

  id: string;

  constructor (props: IList) {
    this.name = props.name;
    this.id = uuid.v4();
    this.description = props.description;
    this.date = props.date; 
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
  clearDeletedTodos () {
    this.todos = this.visibleTodos;
  }

  @action
  addNewTodo ({ title, description }: { title: string, description: string }) {
    const todo = new Todo({ title, description, date: new Date(), id: uuid.v4() });
    this.todos.push(todo);
    storage.addTodo(this.id, todo);
  }

  @action
  toggleAll () {
    this.todos.forEach(todo => todo.editTodo({ isDone: !todo.isDone }));
  }
}