import { observable, action, computed } from 'mobx';

import Todo from '../Todo';

class State {
  @observable
  newTodo: Todo = new Todo();

  @observable
  todos: Todo[] = [];

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
    const todo = new Todo(title, description);
    this.todos.push(todo);
  }

  @action
  toggleAll () {
    this.todos.forEach(todo => todo.editTodo({ isDone: !todo.isDone }));
  }
}

export default State;