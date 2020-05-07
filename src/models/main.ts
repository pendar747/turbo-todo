import { observable, action } from 'mobx';

class Todo {
  @observable
  title: String = '';

  @observable
  description: String = '';

  @observable
  isDone: boolean = false;

  constructor (title: string = '', description: string = '') {
    this.title = title;
    this.description = description;
  }
}

class State {
  @observable
  newTodo: Todo = new Todo();

  @observable
  todos: Todo[] = [];

  @action
  addNewTodo (title: string, description: string) {
    this.todos.push(new Todo(title, description));
  }

  @action
  deleteTodo (index: number) {
    this.todos = this.todos.filter((_, i) => i !== index);
  }
}

export default State;