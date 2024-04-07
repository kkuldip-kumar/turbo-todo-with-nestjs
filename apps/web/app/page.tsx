
import { Suspense } from "react";
import { Navbar } from "../components/navbar";
import { TodoWrapper } from "../components/todos/todo-wrapper";



export default function Page(): JSX.Element {
  return (
    <Suspense fallback={<p>Loading</p>}>

      <div className="">
        <Navbar />
        <div className="max-w-screen-xl mx-auto py-8 w-1/2">
          <TodoWrapper />
        </div>
      </div>
    </Suspense>
  );
}
