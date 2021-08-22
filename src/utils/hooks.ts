import _ from "lodash";
import { useEffect, useState } from "react";

export const useSticky = () => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const scroll = () => {
      console.log(document.documentElement.scrollTop);
      
      if (document.documentElement.scrollTop > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    }
    const _scroll = _.throttle(scroll, 80);
    window.addEventListener('scroll', _scroll);
    return () => {
      window.removeEventListener('scroll', _scroll);
    }
  }, [])
  return { isSticky }
}

export const useMount = (callback: Function = () => { }) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export const useDebounce = <V>(param: V, delay: number) => {
  const [value, setValue] = useState(param)
  useEffect(() => {
    const id = setTimeout(() => {
      setValue(param)
    }, delay);
    return () => clearTimeout(id)
  }, [param, delay])
  return value
}