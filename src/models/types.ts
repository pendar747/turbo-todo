export interface ITodo {
  title: string,
  date: Date,
  id: string,
  isDone: boolean,
  isDeleted: boolean
  listId: string
}

export interface IList {
  name: string,
  description: string,
  date: Date,
  id: string,
  todos: ITodo[],
  isDeleted: boolean
}
