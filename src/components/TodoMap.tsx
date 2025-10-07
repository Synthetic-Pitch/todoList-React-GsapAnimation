import { UseTodo } from "../customHook/todoHook";

const TodoMap = () => {
    const {} = UseTodo();
    
    return (
        <div className="bg-[red] w-full max-w-[1200px]">TodoMap</div>
    );
};

export default TodoMap;