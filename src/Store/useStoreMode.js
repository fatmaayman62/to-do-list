import { create } from "zustand";
import { persist } from "zustand/middleware";



const useStoreMode=create(persist((set)=>({
    modeWeb:'light',
    toggleMode:()=>set((state)=>({modeWeb:state.modeWeb==="light"?"dark":"light"}))
}),{name:'mode'}))

export default useStoreMode;