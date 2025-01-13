import { useEffect } from "react";

export function useOutSideClick<T>(
  ref: React.RefObject<T>,
  callback: () => void
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      console.log(event.clientX, event.clientY);
      // if (ref.current && !ref.current.contains(event.target as Node)) {
      //   callback();
      // }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
}
