import Main from './Main'
import { useAppState } from '../../utils/Context'
import DashNav from './DashNav'

const Content = () => {
  const {state,setState}=useAppState()
  const temp=window.location.href
  const url=temp.split('/')[3]
  if(url==='dashboard'){
    if(localStorage.getItem("appState")=="specificAccount"){
      setState("account")
    }
    if(localStorage.getItem("appState")=="specificGroup"){
      setState("groups")
    }
    if(localStorage.getItem("appState")=="specificCampaign"){
      setState("campaign")
    }
  }
  console.log(url)
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