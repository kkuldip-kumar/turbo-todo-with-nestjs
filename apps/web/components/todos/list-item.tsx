import React from 'react'
import { ActionButtons } from './action-btns'
import { Todo } from './todo-type'

type Props = {
    item: Todo
}


export const ItemList = ({ item }: Props) => {

    return (
        <>
            <div>
                <div
                    className="bg-white shadow-md flex flex-col items-start gap-2 rounded-md border p-5 text-left text-sm transition-all"
                >
                    <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                            <div className="flex items-center gap-2">
                                <h5 className="font-semibold text-lg">{item.title}</h5>
                            </div>
                            <div className="ml-auto text-xs text-muted-foreground">
                                <div
                                    className="inline-flex items-center rounded px-2.5 py-0.5 text-sm capitalize bg-green-400 text-white"
                                >
                                    {item.status}
                                </div>
                            </div>
                        </div>
                    </div>
                    <p
                        className="line-clamp-2 text-sm text-slate-400 text-muted-foreground"
                    >
                        {item.content}
                    </p>
                </div>
                {item.id ? <ActionButtons id={item.id} /> : null}
            </div>
        </>
    )
}


