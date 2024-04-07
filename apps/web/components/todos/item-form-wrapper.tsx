'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { AddItemForm } from "./add-item-form";
import { useQuery } from "@tanstack/react-query";
import { getItemById } from "./actions/todo-api";
import { useEffect, useMemo } from "react";
import { EditItemForm } from "./edit-item-form";
import { Todo } from "./todo-type";


export const ItemFormWrapper = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const todoId = searchParams.get("todo_id") || "";
  const Id = useMemo(() => todoId, [todoId])
  const { isLoading, isFetching, refetch, isError, data, error } = useQuery({
    queryKey: ["todos"],
    enabled: Id ? true : false,
    queryFn: async () => getItemById(Id)
  });
  console.count('wrapper')
  useEffect(() => {
    if (Id) {
      refetch(); // Trigger a manual refetch when Id changes
    }
  }, [Id, refetch]);
  if (!Id) return (<AddItemForm />)
  if (!isLoading && !error && data) return (<EditItemForm item={data as Todo} />)
  return null
}
