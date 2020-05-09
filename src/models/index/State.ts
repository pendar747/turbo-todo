import { observable, action } from 'mobx';
import Todo from '../Todo';


class State {
  @observable
  newTodo: Todo = new Todo();

  @observable
  todos: Todo[] = [];

  @action
  addNewTodo ({ title, description }: { title: string, description: string }) {
    this.todos.push(new Todo(title, description));
  }

  @action
  deleteTodo (index: number) {
    this.todos = this.todos.filter((_, i) => i !== index);
  }

  @action
  toggleAll () {
    this.todos.forEach(todo => todo.editTodo({ isDone: !todo.isDone }));
  }
}

export default State;