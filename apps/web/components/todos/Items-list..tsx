'use client'
import { useQuery } from "@tanstack/react-query";
import React from 'react'
import { ItemList } from "./list-item"
import { getAllItems } from './actions/todo-api'
import { Todo } from "./todo-type";
export const ItemsList = () => {
    const { isLoading, isFetching, isError, data, error } = useQuery({
        queryKey: ["todos"],
        queryFn: getAllItems,
    });
    if (isLoading || isFetching) return (<p>Loading</p>);
    if (!data) return null
    return (
        <>
            {Array.isArray(data) && data.length ? (
                <div className="space-y-3">
                    {data.map((item: Todo) =>
                        (<ItemList item={item} key={item.id} />)
                    )}
                </div>
            ) :
                (<div className="">
                    <p>No Todo</p>
                </div>)}
        </>
    )
}


