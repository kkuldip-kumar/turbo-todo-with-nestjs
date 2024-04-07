import http from "./api";
import { Todo, TodoList } from '../todo-type'
export const getAllItems = async () => {
  try {
    const res = await http.get(`todos`);
    const list: TodoList = res.data;
    return list;
  } catch (error) {
    return error
  }
};

export const getItemById = async (params: string) => {
  try {
    const res = await http.get(`todos/${params}`);
    if (!res.data) throw new Error('no data found')
    const item: Todo = res.data;
    return item
  } catch (error) {
    return error
  }
};
export const createItem = async (data: Todo) => {
  try {
    const res = await http.post(`todos`, data);
    return 'created'
  } catch (error) {
    return error
  }
};

export const updateItem = async (data: Todo) => {
  try {
    const res = await http.put(`todos/${data.id}`, data);
    return 'updated';
  } catch (error) {
    console.log("error", error);
  }
};
export const deleteItem = async (id: string) => {
  // delete(params) {
  try {
    const res = await http.delete(`todos/${id}`);
    return 'deleted';
  } catch (error) {
    console.log("error", error);
  }
};
