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
  draftTitle: string = '';

  @observable
  date: Date;

  id: string;

  @action
  editTodo () {
    this.title = this.draftTitle;
    this.isEditing = false;
  }

  @action
  toggleDone () {
    this.isDone = !this.isDone;
  }

  @action
  setDraftTitle ({ value }: { value: string }) {
    this.draftTitle = value ?? '';
  }

  @action
  setEditing () {
    this.draftTitle = this.title;
    this.isEditing = true;
  }

  @action 
  cancelEditing () {
    this.isEditing = false;
  }

  @action 
  deleteTodo () {
    this.isDeleted = true;
  }
  
  constructor (props: ITodo) {
    this.title = props.title;
    this.id = props.id;
    this.date = props.date;
  }
}
