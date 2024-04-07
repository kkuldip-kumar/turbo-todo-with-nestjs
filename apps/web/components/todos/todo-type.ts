export type Todo = {
    id?: string
    title: string,
    content: string,
    status: string,
}
export type TodoList = Array<Todo>
export const initialTodo: Todo = {
    title: "",
    content: "",
    status: "Pending"
}

export const queryKeys = 'todos'