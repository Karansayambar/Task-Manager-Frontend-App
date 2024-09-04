import  { useEffect, useState } from "react"
import { IoIosCloudDone } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusOfIsCompleted, deleteTodo, updateTodo } from "../redux/thunk/todoThunkActions";
import DatePicker from "react-datepicker";
;

const ViewDetails = ({ currentSelected ,setCurrentSelected, setViewTask}) => {
  const theme = useSelector((state) => state.theme.theme)
  const [editedTask, setEditedTask] = useState(currentSelected.task);
  const [isModal, setIsModal] = useState(false);

  const [dueDate, setDueDate] = useState(currentSelected.dueDate);

  let {  tasks } = useSelector((state) => state.todo);

  const dispatch = useDispatch()

  const toggleCalender = () => {
    setIsModal(!isModal);
  };

  const handleUpdateTodo = (e) => {
    e.preventDefault()
    dispatch(updateTodo(editedTask,currentSelected._id,dueDate,tasks))
    setViewTask(false)

  }

  const handleDeleteTodo = (e) => {
    e.preventDefault()
    dispatch(deleteTodo( currentSelected._id, tasks))
    setViewTask(false)

    
  }

  const handleOnCompleted = () => {
        dispatch(changeStatusOfIsCompleted(currentSelected._id,currentSelected.isCompleted, tasks))
  }
 
  return (
    <div className={`container relative flex flex-col justify-between w-full h-[895px] rounded-sm  bg-[#EEF6EF]`}>
      <span onClick={()=> setViewTask(false)} className='absolute  px-1 py-1 text-xl font-bold cursor-pointer left-6 top-2 text-primary'>  <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.4 14.5L0 13.1L5.6 7.5L0 1.9L1.4 0.5L7 6.1L12.6 0.5L14 1.9L8.4 7.5L14 13.1L12.6 14.5L7 8.9L1.4 14.5Z"
              fill="black"
            />
          </svg></span>
      <div className="flex flex-col h-[903px] w-full items-start justify-between  pl-[56px] pt-[56px]">
        <div className="w-full">
          
          <div className="flex w-full  items-center justify-between p-8  border-t-2 border-[#D9E5DA] ">
            <div className="flex items-center justify-between gap-4">
              <input
                className="text-md font-semibold py-2 px-3 text-black/80"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
              ></input>
              <button onClick={(e)=> handleUpdateTodo(e)} className="px-2 py-1.5 cursor-pointer rounded-md bg-primary/90 text-white font-semibold">
                Update
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full ">
            <div className="flex w-full  items-center justify-between px-8 py-5 border-t-2 border-[#D9E5DA] ">
              <div className="flex items-center justify-between gap-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1667 12.8333H2V11.1667H11.1667V2H12.8333V11.1667H22V12.8333H12.8333V22H11.1667V12.8333Z"
                    fill="black"
                  />
                </svg>
                <p className="text-md font-semibold text-black/80">Add Step</p>
              </div>
            </div>
            <div className="flex w-full  items-center justify-between px-8 py-5 border-t-2 border-[#D9E5DA] ">
              <div onClick={handleOnCompleted} className="flex cursor-pointer items-center justify-between gap-4">
              <IoIosCloudDone className="w-6 h-6" />
                <p className="text-md font-semibold text-black/80">
                  Add to Completed
                </p>
              </div>
            </div>

            <div  className="flex w-full relative items-center justify-between px-8 py-5 border-t-2 border-[#D9E5DA] ">
              <div  onClick={toggleCalender} className="flex items-center justify-between gap-4">
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 3V1M13 3V5M13 3H8.5M1 9V18C1 18.5304 1.21071 19.0391 1.58579 19.4142C1.96086 19.7893 2.46957 20 3 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V9M1 9H19M1 9V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H5M19 9V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H16.5M5 1V5"
                    stroke="#1B281B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-md font-semibold text-black/80">
                  Add Due Date
                </p>
              </div>
              {isModal && (
              <div className="modal absolute top-16 right-32  ">
                <div className="modal-content">
                  {/* <h2>Select a Date</h2> */}
                  <DatePicker
                    selected={dueDate}
                    onChange={(date) => {
                      setDueDate(date);
                      setIsModal(false);
                    }}
                    inline
                  />
                  
                </div>
              </div>
            )}

            </div>
         
            <div className="flex w-full  items-center justify-between px-8 py-5 border-t-2 border-[#D9E5DA] ">
              <div className="flex items-center justify-between gap-4">
                <svg
                  width="25"
                  height="22"
                  viewBox="0 0 25 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.0001 7.19864V4.99964H8.00008C6.97897 4.99954 5.97473 5.26004 5.08243 5.75648C4.19012 6.25292 3.43928 6.96887 2.90097 7.83656C2.36267 8.70425 2.05471 9.69497 2.00626 10.7149C1.9578 11.7349 2.17045 12.7503 2.62408 13.6651C2.66801 13.7534 2.69412 13.8494 2.70093 13.9478C2.70775 14.0461 2.69512 14.1448 2.66378 14.2383C2.63244 14.3318 2.583 14.4181 2.51828 14.4925C2.45356 14.5668 2.37483 14.6277 2.28658 14.6716C2.19833 14.7156 2.10229 14.7417 2.00395 14.7485C1.90561 14.7553 1.80689 14.7427 1.71343 14.7113C1.61997 14.68 1.53359 14.6306 1.45924 14.5658C1.38488 14.5011 1.32401 14.4224 1.28008 14.3341C0.712439 13.1905 0.446142 11.9209 0.506408 10.6456C0.566675 9.3703 0.951511 8.13147 1.62447 7.04648C2.29742 5.96149 3.23621 5.06626 4.35193 4.44557C5.46764 3.82489 6.72334 3.4993 8.00008 3.49964H17.0001V1.30064C17.0001 1.22939 17.0204 1.15961 17.0587 1.09949C17.0969 1.03937 17.1515 0.991394 17.216 0.961175C17.2806 0.930956 17.3524 0.919747 17.423 0.928862C17.4937 0.937977 17.5603 0.967038 17.6151 1.01264L21.1551 3.96164C21.3351 4.11164 21.3351 4.38764 21.1551 4.53764L17.6151 7.48664C17.5603 7.53224 17.4937 7.56131 17.423 7.57042C17.3524 7.57953 17.2806 7.56833 17.216 7.53811C17.1515 7.50789 17.0969 7.45991 17.0587 7.39979C17.0204 7.33967 17.0001 7.2699 17.0001 7.19864ZM22.7151 7.32764C22.8931 7.23922 23.099 7.2251 23.2874 7.28839C23.4759 7.35167 23.6315 7.48718 23.7201 7.66514C24.2877 8.80876 24.554 10.0783 24.4937 11.3537C24.4335 12.629 24.0486 13.8678 23.3757 14.9528C22.7027 16.0378 21.7639 16.933 20.6482 17.5537C19.5325 18.1744 18.2768 18.5 17.0001 18.4996H8.00008V20.6986C8.00005 20.7699 7.97972 20.8397 7.94148 20.8998C7.90323 20.9599 7.84864 21.0079 7.78411 21.0381C7.71958 21.0683 7.64778 21.0795 7.57711 21.0704C7.50644 21.0613 7.43983 21.0322 7.38508 20.9866L3.84508 18.0376C3.80288 18.0024 3.76892 17.9584 3.74562 17.9086C3.72232 17.8589 3.71025 17.8046 3.71025 17.7496C3.71025 17.6947 3.72232 17.6404 3.74562 17.5906C3.76892 17.5409 3.80288 17.4968 3.84508 17.4616L7.38508 14.5126C7.43983 14.467 7.50644 14.438 7.57711 14.4289C7.64778 14.4197 7.71958 14.431 7.78411 14.4612C7.84864 14.4914 7.90323 14.5394 7.94148 14.5995C7.97972 14.6596 8.00005 14.7294 8.00008 14.8006V16.9996H17.0001C18.0213 17 19.0257 16.7397 19.9182 16.2433C20.8108 15.747 21.5618 15.0311 22.1003 14.1634C22.6388 13.2956 22.9469 12.3048 22.9954 11.2847C23.0439 10.2647 22.8313 9.24907 22.3776 8.33414C22.2892 8.1561 22.275 7.95024 22.3383 7.76179C22.4016 7.57334 22.5371 7.41623 22.7151 7.32764Z"
                    fill="#1B281B"
                  />
                </svg>
                <p className="text-md font-semibold text-black/80">Repeat</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex justify-between border-t-2 border-t-[#35793799] w-full p-4 ">
        <div>
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.4 14.5L0 13.1L5.6 7.5L0 1.9L1.4 0.5L7 6.1L12.6 0.5L14 1.9L8.4 7.5L14 13.1L12.6 14.5L7 8.9L1.4 14.5Z"
              fill="black"
            />
          </svg>
        </div>
        <div>
          <span className="text-sm font-semibold text-black/70">
            Created Todo
          </span>
        </div>
        <div>
          <svg
            onClick={handleDeleteTodo}
            width="24"
            height="27"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_5_3346)">
              <path
                d="M5.02666 26.6417C4.25888 26.6417 3.61832 26.385 3.10499 25.8717C2.59166 25.3583 2.33443 24.7172 2.33332 23.9483V3.30834H0.666656V1.64167H7.33332V0.358337H17.3333V1.64167H24V3.30834H22.3333V23.95C22.3333 24.7167 22.0767 25.3572 21.5633 25.8717C21.05 26.3861 20.4089 26.6428 19.64 26.6417H5.02666ZM8.67999 21.6417H10.3467V6.64167H8.67999V21.6417ZM14.32 21.6417H15.9867V6.64167H14.32V21.6417Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_5_3346">
                <rect
                  width="23.3333"
                  height="26.2833"
                  fill="white"
                  transform="translate(0.666656 0.358337)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
