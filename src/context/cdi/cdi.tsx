'use client'
import { createContext, ReactNode, useContext, useState } from 'react'

export type CdiContextType = {
  cdiRate: number
  handleChangeCdiRate: (cdiRate: number) => void
}

export const CdiContext = createContext({} as CdiContextType)

type CdiContextProviderProps = {
  children: ReactNode
  cdiRate: number
}

export const CdiContextProvider = (props: CdiContextProviderProps) => {
  const { children } = props

  const [cdiRate, setCdiRate] = useState(props.cdiRate)

  const handleChangeCdiRate = (newCdiRate: number) => {
    setCdiRate(newCdiRate)
  }

  return (
    <CdiContext.Provider value={{ cdiRate, handleChangeCdiRate }}>
      {children}
    </CdiContext.Provider>
  )
}

export const useCdi = () => {
  const value = useContext(CdiContext)

  return value
}
