import { useState } from 'react'
import ListPage from './ListPage'
import ViewDetails from './ViewDetails'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'

const MainPage = ({sidebar, viewTask,setViewTask, view}) => {
    const theme = useSelector((state) => state.theme)
    const [currentSelected, setCurrentSelected] = useState({})

  return (
   <>
    {/* // For Desktop */}
    <div className={`sm:grid grid-cols-10 gap-2 hidden `}>
        {
         sidebar && 
         
         <div className={`  relative  ${!sidebar && !viewTask ? 'col-span-0': !sidebar && viewTask ?'col-span-0': sidebar && viewTask ? 'col-span-2' : 'col-span-2 '}bg-white`}>
        {/* Todo Sidebar display */}
        <img className=" absolute flex left-20 top-8 rounded-full w-[118px] h-[118px] " src="./profile.jfif" alt="profileImg"/>
            <Sidebar/>
        </div>

        }
        {/* Todo list display */}
        <div className={`    ${!sidebar && !viewTask ? 'col-span-10': !sidebar && viewTask ?'col-span-7': sidebar && viewTask ? 'col-span-5' : 'col-span-8 '}`}>
            <ListPage viewTask={viewTask} setViewTask={setViewTask} setCurrentSelected={setCurrentSelected} sidebar={sidebar} view={view}/>
        </div>
        {
            viewTask && 
        <div className={` ${!sidebar && !viewTask ? 'col-span-0': !sidebar && viewTask ?'col-span-3': sidebar && viewTask ? 'col-span-3' : 'col-span-0 '}`}>
        {/* Todo Details display */}
            
            <ViewDetails setViewTask={setViewTask} setCurrentSelected={setCurrentSelected} currentSelected={currentSelected}/>
            </div>

        }
    </div>
    {/* // For Mobile and tab */}
    <div className={` grid grid-cols-10 gap-2 sm:hidden  container`}>
        {
         sidebar && 
         <div className={`z-10 h-screen overflow-y-auto  absolute ${!sidebar && !viewTask ? 'col-span-0': !sidebar && viewTask ?'col-span-0': sidebar && viewTask ? 'col-span-5' : 'col-span-10 '} `}>
            <Sidebar/>
        </div>

        }
        {
            !viewTask &&
            <div className={` col-span-10 `}>
            <ListPage viewTask={viewTask} setViewTask={setViewTask} setCurrentSelected={setCurrentSelected} sidebar={sidebar} view={view} />
            </div>
        }
        {
            viewTask  && 
        <div className={` col-span-10`}>
            <ViewDetails setViewTask={setViewTask} setCurrentSelected={setCurrentSelected}  currentSelected={currentSelected}/>
        </div>

        }
    </div>
    </>
    
  )
}

export default MainPage