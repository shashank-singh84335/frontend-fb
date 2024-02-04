import React from 'react'
import DashNav from './DashNav'
import Main from './Main'

const Content = () => {
  return (
    <div className='h-screen flex flex-col w-full'>
        {/* <div className='flex'>
            <DashNav />
        </div> */}
        <div className='flex'>
            <Main />
        </div>
    </div>
  )
}

export default Content