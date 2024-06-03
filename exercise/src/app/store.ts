import { create } from 'zustand'

type Pdf = {
    name: string
    path: string
    size: number
}

export type Dates = {
    firstDate: string
    datesArray: string[]
}

type FormStore = {
    bigText: string
    DividedQuality: number
    pdf: Pdf[]
    dateList: Dates
    setBigText: (bigText: string) => void
    setDividedQuality: (DividedQuality: number) => void
    setPdf: (pdf: Pdf[]) => void
    setDateList: (dateList: Dates) => void
} 

export const useFormStore = create<FormStore>((set) => ({
    bigText: '',
    DividedQuality: 0,
    pdf: [],
    dateList: {firstDate: '', datesArray: []},
    setBigText: (bigText: string) => set({ bigText }),
    setDividedQuality: (DividedQuality: number) => set({ DividedQuality }),
    setPdf: (pdf: Pdf[]) => set({ pdf }),
    setDateList: (dateList: Dates) => set({ dateList }),
}))