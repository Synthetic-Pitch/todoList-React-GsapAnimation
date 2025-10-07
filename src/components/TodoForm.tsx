import { UseTodo } from "../customHook/todoHook";

const TodoForm = () => {
    const {} = UseTodo();

    return (
        <div className="w-full max-w-[1200px] flex flex-col items-center">
          <textarea rows={4} className="w-full tablet:w-[80%] py-4 px-2 outline-1 rounded-xl outline-gray-700"></textarea>

          <section className="w-full px-4 py-6">
            <aside className="flex gap-4">
                <button className="cursor-pointer px-2 bg-[red] rounded-xl">+addItem</button>
                <button className="cursor-pointer px-2 bg-[red] rounded-xl">delete</button>
                <button className="cursor-pointer px-2 bg-[red] rounded-xl">date</button>
            </aside>
          </section>
        </div>
    );
};

export default TodoForm;