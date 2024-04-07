import http from "./api";
import { Todo, TodoList } from '../todo-type'
export const getAllItems = async () => {
  try {
    const res = await http.get(`todos`);
    console.log("data", res.data);
    return res.data as TodoList;
  } catch (error) {
    console.log("error", error);
  }
};

export const getItemById = async (params) => {
  try {
    const res = await http.get(`todos/${params}`);
    return res.data as Todo;

  } catch (error) {
    return error
  }
};
export const createItem = async (data) => {
  try {
    const res = await http.post(`todos`, data);
    return res.data
  } catch (error) {
    return error
  }
};

export const updateItem = async (data) => {
  try {
    const res = await http.put(`todos/${data.id}`, data);
    console.log("data", res.data);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};
export const deleteItem = async (id) => {
  // delete(params) {
  try {
    const res = await http.delete(`todos/${id}`);
    console.log("reletesd", res.data);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};
