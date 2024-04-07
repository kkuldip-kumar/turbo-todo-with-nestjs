
import React from 'react'
import { ItemsList } from './Items-list.'
import { ItemFormWrapper } from './item-form-wrapper'

export const TodoWrapper = () => {
    return (
        <div className="space-y-3">
            <div className="">
                <ItemFormWrapper />
            </div>
            <div className="">
                <h3 className="my-3 font-semibold text-xl">Todo List</h3>
                <ItemsList />
            </div>
        </div>
    )
}
