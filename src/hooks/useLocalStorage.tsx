import React from 'react'

interface IUseLocalStorageProps {
  getLocalStorage: (key: string) => unknown | undefined
  setLocalStorage: (key: string, value: unknown) => void
  removeLocalStorage: (key: string) => void
}

const useLocalStorage = (): IUseLocalStorageProps => {
  return React.useMemo(() => {
    const getLocalStorage = (key: string) => {
      const data = window.localStorage.getItem(key)

      if (!data) return

      return JSON.parse(data)
    }

    const setLocalStorage = (key: string, value: unknown) => {
      const data = JSON.stringify(value)

      return window.localStorage.setItem(key, data)
    }

    const removeLocalStorage = (key: string) => {
      return window.localStorage.removeItem(key)
    }

    return {
      getLocalStorage,
      setLocalStorage,
      removeLocalStorage
    }
  }, [])
}

export default useLocalStorage
