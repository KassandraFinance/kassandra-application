import React from 'react'

interface IUseLocalStorageProps {
  getLocalStorage: (key: string) => unknown | undefined
  setLocalStorage: (key: string, value: unknown) => void
  removeLocalStorage: (key: string) => void
}

const useLocalStorage = (): IUseLocalStorageProps => {
  const getLocalStorage = React.useCallback((key: string) => {
    const data = window.localStorage.getItem(key)

    return data ? JSON.parse(data) : undefined
  }, [])

  const setLocalStorage = React.useCallback((key: string, value: unknown) => {
    const data = JSON.stringify(value)

    return window.localStorage.setItem(key, data)
  }, [])

  const removeLocalStorage = React.useCallback((key: string) => {
    return window.localStorage.removeItem(key)
  }, [])

  return {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage
  }
}

export default useLocalStorage
