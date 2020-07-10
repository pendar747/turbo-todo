import { observable, action } from "mobx";
import { ITodo } from "./types";
import db from "./db";

export default class Todo implements ITodo {
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

  listId: string;

  id: string;
  
  constructor (props: ITodo) {
    this.title = props.title;
    this.id = props.id;
    this.date = props.date;
    this.listId = props.listId;
    this.isDeleted = props.isDeleted;
    this.isDone = props.isDone;
  }

  @action
  editTodo () {
    this.title = this.draftTitle;
    this.isEditing = false;
    this.save();
  }

  @action
  toggleDone () {
    this.isDone = !this.isDone;
    this.save();
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
    this.save();
  }
  
  save () {
    return db.todos.put({
      date: this.date,
      id: this.id,
      isDeleted: this.isDeleted,
      isDone: this.isDone,
      listId: this.listId,
      title: this.title
    }, this.id);
  }
}
