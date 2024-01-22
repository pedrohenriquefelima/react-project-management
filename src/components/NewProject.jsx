import { useRef } from 'react';
import Input from "./Input";
import Modal from  "./Modal";

export default function NewProject({onAddProjectUp, onCancelProjectUp}) {

    //adding ref attribute to the Input element won't actually reference to the input.
    //instead it needs to be forwarded

    const title = useRef();
    const description = useRef();
    const dueDate = useRef();
    const modalReference = useRef();

    function cancelProject() {
        onCancelProjectUp();
    }

    function saveProject(){
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        //validation goes here - before sending the data to the main component

        if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === '') {
            modalReference.current.open();
            return;
        }

        onAddProjectUp({id: Math.random(), title: enteredTitle, description: enteredDescription, dueDate: enteredDueDate});
    }

    return (
    <>
        <Modal ref={modalReference} buttonLabel='Close'>
            <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
            <p className='text-stone-600 mb-4'>Oh no,looks like you forgot to enter a value</p>
            <p className='text-stone-600 mb-4'>Please make sure you provide a valid value for every input field.</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button onClick={cancelProject} className="text-stone-800 hover:text-stone-950">Cancel</button>
                </li>
                <li>
                    <button onClick={saveProject} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>
                </li>
            </menu>
            <div>
                <Input label='Title' type='text' ref={title}/>
                <Input label='Description' type='textarea' ref={description}/>
                <Input label='Due Date' type="date" ref={dueDate}/>
            </div>
        </div>
    </>)
    
}