import { useEffect } from "react";

type clickedOutsideProps = {
  modalRef: React.RefObject<HTMLDivElement>;
  action: () => void;
};
const useClickedOutside = ({ modalRef, action }: clickedOutsideProps): void => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        action();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);
};

export default useClickedOutside;
