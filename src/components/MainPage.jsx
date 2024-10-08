import { useState } from "react";
import ListPage from "./ListPage";
import ViewDetails from "./ViewDetails";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const MainPage = ({ sidebar, viewTask, setViewTask, view }) => {
  const theme = useSelector((state) => state.theme);
  const [currentSelected, setCurrentSelected] = useState({});

  return (
    <>
      {/* For Desktop */}
      <div className={`sm:grid grid-cols-10 gap-2 hidden relative`}>
        {/* Sidebar */}
        {sidebar && (
          <div
            className={`bg-white ${
              !sidebar && !viewTask
                ? "col-span-0"
                : !sidebar && viewTask
                ? "col-span-0"
                : sidebar && viewTask
                ? "col-span-2"
                : "col-span-2"
            } z-10`}
          >
            <img
              className="absolute flex z-20 left-20 top-8 rounded-full w-[118px] h-[118px]"
              src="./profile.jfif"
              alt="profileImg"
            />
            <Sidebar />
          </div>
        )}
        {/* ListPage */}
        <div
          className={` ${
            !sidebar && !viewTask
              ? "col-span-10"
              : !sidebar && viewTask
              ? "col-span-7"
              : sidebar && viewTask
              ? "col-span-5"
              : "col-span-8"
          } relative`}
        >
          <ListPage
            viewTask={viewTask}
            setViewTask={setViewTask}
            setCurrentSelected={setCurrentSelected}
            sidebar={sidebar}
            view={view}
          />
        </div>
        {/* ViewDetails */}
        {viewTask && (
          <div
            className={` ${
              !sidebar && !viewTask
                ? "col-span-0"
                : !sidebar && viewTask
                ? "col-span-3"
                : sidebar && viewTask
                ? "col-span-3"
                : "col-span-0"
            } z-10`}
          >
            <ViewDetails
              setViewTask={setViewTask}
              setCurrentSelected={setCurrentSelected}
              currentSelected={currentSelected}
            />
          </div>
        )}
      </div>

      {/* For Mobile and Tab */}
      <div className={`grid grid-cols-10 gap-2 sm:hidden container`}>
        {/* Sidebar */}
        {sidebar && (
          <div
            className={`z-10 h-screen overflow-y-auto ${
              !sidebar && !viewTask
                ? "col-span-0"
                : !sidebar && viewTask
                ? "col-span-0"
                : sidebar && viewTask
                ? "col-span-5"
                : "col-span-10"
            }`}
          >
            <img
              className="absolute flex z-20 left-20 top-8 rounded-full w-[118px] h-[118px]"
              src="./profile.jfif"
              alt="profileImg"
            />
            <Sidebar />
          </div>
        )}
        {/* ListPage */}
        {!viewTask && (
          <div className={`col-span-10`}>
            <ListPage
              viewTask={viewTask}
              setViewTask={setViewTask}
              setCurrentSelected={setCurrentSelected}
              sidebar={sidebar}
              view={view}
            />
          </div>
        )}
        {/* ViewDetails */}
        {viewTask && (
          <div className={`col-span-10`}>
            <ViewDetails
              setViewTask={setViewTask}
              setCurrentSelected={setCurrentSelected}
              currentSelected={currentSelected}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;
