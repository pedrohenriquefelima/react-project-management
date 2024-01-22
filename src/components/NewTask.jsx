import { useState } from "react"

export default function NewTask({onAddTaskForward, projectIdValue}) {

    const [enteredTask, setEnteredTask] = useState('');

    function handleChange(event){
        setEnteredTask(event.target.value);
    }

    function onAddTaskHandler() {
        if(enteredTask.trim() === ''){
            return;
        }
        onAddTaskForward({id: Math.random(), text: enteredTask, projId: projectIdValue});
        setEnteredTask('');
    }

    return <div className="flex items-center gap-4">
        <input onChange={handleChange} value={enteredTask} type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200"/>
        <button onClick={onAddTaskHandler} className="text-stone-700 hover:text-stone-950">Add task</button>
    </div>
}