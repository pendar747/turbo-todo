import { observable, action } from "mobx";
import { ITodo } from "./types";

export default class Todo {
  @observable
  title: string = '';

  @observable
  description: string = '';

  @observable
  isDone: boolean = false;

  @observable
  isEditing: boolean = false;

  @observable
  isDeleted: boolean = false;

  @observable
  date: Date;

  id: string;

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
  deleteTodo () {
    this.isDeleted = true;
  }
  
  constructor (props: ITodo) {
    this.title = props.title;
    this.description = props.description;
    this.id = props.id;
    this.date = props.date;
  }
}
