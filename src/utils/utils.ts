export const closeOnClickOutside = (ref: any, setIsOpen: any) => {
    const handleCloseModal = (e: Event) => {
        if (!ref.current) return () => setIsOpen(false);

        !ref.current.contains(e.target) && setIsOpen(false);
    };

    window.addEventListener('mousedown', handleCloseModal);
};
