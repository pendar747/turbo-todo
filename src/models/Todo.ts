import { observable, action } from "mobx";

export default class Todo {
  @observable
  title: String = '';

  @observable
  description: String = '';

  @observable
  isDone: boolean = false;

  @observable
  isEditing: boolean = false;

  @observable
  isDeleted: boolean = false;

  @action
  editTodo ({ title, description, isDone }: { title?: string, description?: string, isDone?: boolean }) {
    this.title = title ?? this.title;
    this.description = description ?? this.description;
    this.isDone = isDone ?? this.isDone;
  }

  @action
  setEdit () {
    this.isDone = true;
  }

  @action 
  cancelEditing () {
    this.isDone = false;
  }

  @action 
  delteTodo () {
    this.isDeleted = true;
  }
  
  constructor (title: string = '', description: string = '') {
    this.title = title;
    this.description = description;
  }
}
