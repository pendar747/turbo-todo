import {openDB, DBSchema, IDBPDatabase } from 'idb';
import { IList, ITodo } from './types';

interface TruboTodoDB extends DBSchema {
  lists: {
    value: IList,
    key: string,
    indexes: {
      title: string,
      description: string
    }
  }
}

export class Storage {
  private db: IDBPDatabase<TruboTodoDB>|undefined;

  async createDb () {
    const db = await openDB<TruboTodoDB>('turbo-todo', 1, {
      upgrade (db) {
        const store = db.createObjectStore('lists', {
          keyPath: 'id'
        });
        store.createIndex('title', 'title');
        store.createIndex('description', 'description');
      }
    });
    this.db = db;
  }

  async addList (list: IList) {
    if (!this.db) {
      await this.createDb();
    }
    return this.db.add('lists', list);
  }

  async addTodo (listId: string, todo: ITodo) {
    if (!this.db) {
      await this.createDb();
    }
    const list = await this.db.get('lists', listId);
    if (list) {
      return this.db.put('lists', {
        ...list,
        todos: [...list.todos, todo]
      }, listId);
    }
  }

  async getList (listId: string) {
    if (!this.db) {
      await this.createDb();
    }
    return this.db.get('lists', listId);
  }

  async getAllLists () {
    if (!this.db) {
      await this.createDb();
    }
    return this.db.getAll('lists');
  }

  async getAllTodos (listId: string) {
    if (!this.db) {
      await this.createDb();
    }
    const list = await this.getList(listId);
    return list?.todos;
  }

  async updateTodo (todo: ITodo, listId: string) {
    if (!this.db) {
      await this.createDb();
    }
    const list = await this.db.get('lists', listId);
    if (list) {
      const todos = list.todos.map(t => {
        return t.id === todo.id ? todo : t;
      });
      return this.db.put('lists', {
        ...list,
        todos
      }, listId);
    }
  }

  async deleteTodo (todoId: string, listId: string) {
    if (!this.db) {
      await this.createDb();
    }
    const list = await this.db.get('lists', listId);
    if (list) {
      const todos = list.todos.filter(t => {
        return t.id !== todoId
      });
      return this.db.put('lists', {
        ...list,
        todos
      }, listId);
    }
  }
}

export default new Storage();

