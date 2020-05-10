import { observable, action } from "mobx";
import TodoList from "../TodoList";
import storage from "../storage";

export default class ListState {
  @observable
  list: TodoList|null = null;

  @action
  async init({ param: id }: { param: string }) {
    const listProps = await storage.getList(id);
    if (listProps) {
      this.list = new TodoList(listProps);
    }
  }
}