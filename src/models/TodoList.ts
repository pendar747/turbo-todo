import { observable, action, computed, autorun } from "mobx";
import Todo from "./Todo";
import { IList } from "./types";

export default class TodoList {
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
  addNewTodo ({ newTitle }: { newTitle: string }) {
    console.log('addNewTodo', { newTitle });
    this.newTitle = '';
    const todo = new Todo({ title: newTitle, date: new Date(), id: this.todos.length.toString() });
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