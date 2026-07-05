import React from 'react'
import Home from './pages/Home'
import useStoreMode from './Store/useStoreMode'

function LayOut() {
    const mode=useStoreMode(state=>state.modeWeb);
  return (
    <main className={mode}>
        <div className='dark:bg-slate-950'> 
        <Home />

        </div>
    </main>
  )
}

export default LayOut