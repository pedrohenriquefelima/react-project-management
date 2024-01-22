import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
//the second argument for createPortal is where this component should be rendered
const Modal = forwardRef(function Modal({children, buttonLabel}, ref) {
    const dialog = useRef();
    //expose function that can be called from outside this component
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    return createPortal(
    <dialog ref={dialog} className='backdrop:bg-stone-900/90 p-4 rounded-md shadow-md'>
        {children}
        <form method="dialog" className='mt-4 text-right'>
            <Button>{buttonLabel}</Button>
        </form>
    </dialog>,
    document.getElementById('modal-root')
    );
})

export default Modal;