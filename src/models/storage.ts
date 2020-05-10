import {openDB, DBSchema, IDBPDatabase } from 'idb';
import { IList } from './types';

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
        store.createIndex('todos', 'todos');
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

  async updateList (listId: string, list: IList) {
    if (!this.db) {
      await this.createDb();
    }
    const list = await this.db.get('lists', listId);
    if (list) {
      return this.db.put('lists', list, listId);
    }
  }

  async deleteList (listId: string) {
    if (!this.db) {
      await this.createDb();
    }
    await this.db.delete('lists', listId);
  }
}

export default new Storage();

