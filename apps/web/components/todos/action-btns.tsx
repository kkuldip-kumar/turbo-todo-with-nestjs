'use client'
import React, { useCallback } from 'react'
import { deleteItem } from './actions/todo-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
type props = {
    id: string
}
export const ActionButtons = ({ id }: props) => {
    console.log('action')
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const orderFilter = searchParams.get("todo_id");
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        }
    });
    const removeTodo = useCallback(async () => {
        try {
            const todo = await mutation.mutateAsync(id);
            console.log(todo);
        } catch (error) {
            console.error(error);
        } finally {
            console.log("done");
        }
    }, [id]);
    const updateTodo = useCallback(async () => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set("todo_id", id);
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`, { scroll: false });
    }, [id]);
    return (
        <div className="gap-2 pt-4 text-right">
            <button
                className="inline-flex items-center bg-blue-500 text-white border justify-center whitespace-nowrap rounded-md text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-9 px-4 py-2"
                type="button"
                onClick={updateTodo}
            >
                edit
            </button>
            <button
                onClick={removeTodo}
                className="inline-flex ms-2 bg-red-500 text-white items-center justify-center whitespace-nowrap rounded-md text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow hover:bg-red-600 h-9 px-4 py-2"
                type="button"
            >
                Delete
            </button>
        </div>
    )
}
