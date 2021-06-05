import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

interface IModal {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (arg: boolean) => void;
}

const Modal = ({ children, isOpen, setIsOpen }: IModal) => {
    const [isOpenContent, setIsOpenContent] = useState(false);
    const modalRef = useRef() as React.RefObject<HTMLDivElement>;

    useEffect(() => {
        const handleCloseModal = (e: any) => {
            if (!modalRef.current) {
                return setIsOpen(false);
            }

            if (!modalRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        window.addEventListener('mousedown', handleCloseModal);

        return () => {
            window.removeEventListener('mousedown', handleCloseModal);
        };
    }, [setIsOpen]);

    return (
        <>
            <CSSTransition
                in={isOpen}
                classNames="modal"
                appear={true}
                timeout={200}
                onEntered={() => setIsOpenContent(true)}
                onExit={() => setIsOpenContent(false)}
                onExited={() => {
                    setIsOpen(false);
                }}
                unmountOnExit>
                <div className="modal">
                    <CSSTransition
                        in={isOpenContent}
                        classNames="modalcontent"
                        appear={true}
                        timeout={300}
                        unmountOnExit>
                        <div ref={modalRef} className="modal__content">
                            {children}
                        </div>
                    </CSSTransition>
                </div>
            </CSSTransition>
        </>
    );
};

Modal.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
};

export default Modal;
