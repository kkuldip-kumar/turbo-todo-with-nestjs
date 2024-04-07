'use client'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
const schema = yup.object().shape({
    title: yup.string().required('Title is  required'),
    content: yup.string().required('Description is required'),
})
    .required()

import React, { useState } from 'react'
import { Todo, initialTodo } from "./todo-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItem } from "./actions/todo-api";
import { usePathname, useRouter } from "next/navigation";
type props = {
    item: Todo
}
export const EditItemForm = ({ item }: props) => {
    const router = useRouter();
    const pathname = usePathname();
    const [itemForEdit,] = useState({ ...item })
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: updateItem,
        onSuccess: () => {
            queryClient.invalidateQueries(`todos`);
        }
    })
    console.log('item for edit', itemForEdit)
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: itemForEdit,
    });
    const onSubmit = async (values) => {
        if (values) {
            try {
                const res = await mutation.mutateAsync(values)

                reset({});
                router.replace(
                    pathname,
                    {
                        pathname: router.pathname,
                        query: '',
                    },
                    { scroll: false }
                );
            } catch (error) {
                console.log('error', error)
            }
        }
    };
    return (
        <div className="bg-white shadow rounded-md border p-5">
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <label
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >Title</label>
                    <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your Title"

                        {...register("title")}
                    />
                </div>

                <div className="space-y-2">
                    <label
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >Description</label>
                    <textarea
                        className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        placeholder="Write some description..."

                        {...register("content")}
                    ></textarea>

                </div>
                <div className="space-y-2">
                    <label
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >Status</label>
                    {/* {...register("status")} */}
                    <Controller
                        name="status"
                        control={control}
                        defaultValue="" // Set default value if needed
                        render={({ field }) => (
                            <select
                                {...field}
                                className="flex h-[40px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                            >
                                <option value="" selected disabled className="test-base">select status</option>
                                <option className="test-base">Progress</option>
                                <option className="test-base">Completed</option>
                                <option className="test-base">Pending</option>
                            </select>
                        )}
                    />
                </div>
                <div className="gap-2 pt-4 text-right">
                    <button
                        className="inline-flex items-center border justify-center whitespace-nowrap rounded-md text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-9 px-4 py-2"
                        type="reset"
                    >
                        Reset
                    </button>
                    <button
                        className="inline-flex ms-2 bg-blue-500 text-white items-center justify-center whitespace-nowrap rounded-md text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow hover:bg-blue-600 h-9 px-4 py-2"
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

