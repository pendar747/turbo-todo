import Dixie from 'dexie';
import { IList, ITodo } from './types';

export class Database extends Dixie {

  lists: Dexie.Table<Omit<IList, 'todos'>, string>;

  todos: Dixie.Table<ITodo, string>;

  constructor() {
    super("TodoApp");
    this.version(1).stores({
      lists: 'id, name, description, date',
      todos: 'id, date, title, listId'
    });

    this.lists = this.table("lists");
    this.todos = this.table("todos");
  }
}

export default new Database();
