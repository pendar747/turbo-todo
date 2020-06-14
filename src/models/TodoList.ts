import { observable, action, computed, autorun } from "mobx";
import Todo from "./Todo";
import { IList } from "./types";

export default class TodoList {
  @observable
  newTodo: Todo = new Todo({ title: '', description: '', date: new Date(), id: '' });

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

  id: string;

  constructor (props: IList) {
    this.name = props.name;
    this.id = props.id;
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
    const todo = new Todo({ title, description, date: new Date(), id: this.todos.length.toString() });
    this.todos.push(todo);
  }

  @action
  toggleAll () {
    this.todos.forEach(todo => todo.editTodo({ isDone: !todo.isDone }));
  }

  @action
  deleteList () {
    this.isDeleted = true;
  }
}