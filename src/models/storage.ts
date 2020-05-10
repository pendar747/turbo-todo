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
  private _db: IDBPDatabase<TruboTodoDB>|undefined;

  async getDB () {
    if (this._db) {
      return this._db;
    }
    return openDB<TruboTodoDB>('turbo-todo', 1, {
      upgrade (db) {
        const store = db.createObjectStore('lists', {
          keyPath: 'id'
        });
        store.createIndex('title', 'title');
        store.createIndex('description', 'description');
      }
    });
  }

  async addList (list: IList) {
    const db = await this.getDB();
    return db.add('lists', list);
  }

  async getList (listId: string) {
    const db = await this.getDB();
    return db.get('lists', listId);
  }

  async getAllLists () {
    const db = await this.getDB();
    return db.getAll('lists');
  }

  async updateList (listId: string, list: IList) {
    const db = await this.getDB();
    if (list) {
      return db.put('lists', list, listId);
    }
  }

  async deleteList (listId: string) {
    const db = await this.getDB();
    return db.delete('lists', listId);
  }
}

export default new Storage();

