import { useEffect, useState } from "react";

const exceptZero = (value: any) => value === 0 ? false : !value;

const cleanObject = (data: { [key: string]: unknown }) => {
  const result = { ...data };
  Object.keys(result).forEach(key => {

    if (exceptZero(result[key])) {
      delete result[key];
    }
  })
  return result;
}

const useMount = (callback: Function = () => { }) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

const debounce = (fn: Function, delay: number) => {
  // let id: NodeJS.Timeout;
  // return (...param: any) => {
  //   if (id) {
  //     clearTimeout(id);
  //   }
  //   id = setTimeout(() => {
  //     fn(...param)
  //   }, delay);
  // }
}

const useDebounce = <V>(param: V, delay: number) => {
  const [value, setValue] = useState(param)
  useEffect(() => {
    const id = setTimeout(() => {
      setValue(param)
    }, delay);
    return () => clearTimeout(id)
  }, [param, delay])
  return value
}


const goHome = () => window.location.href = window.location.origin
export {
  cleanObject,
  useMount,
  debounce,
  useDebounce,
  goHome
}