import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterPage";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";

function App() {
  const [sidebar, setSidebar] = useState(true);
  const [viewTask, setViewTask] = useState(false);
  const [view, setView] = useState("List");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleClick = () => {
    setSidebar(!sidebar);
  };



  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {!isAuthenticated && (
          <>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </>
        )}
        {/* Protected Routes */}
        {isAuthenticated && (
          <>
            <Route
              path="/"
              element={
                <div className="mt-0">
                  <Navbar handleClick={handleClick} view={view} setView={setView} />
                  <MainPage
                    view={view}
                    sidebar={sidebar}
                    setViewTask={setViewTask}
                    viewTask={viewTask}
                  />
                </div>
              }
            />
          </>
        )}
        {!isAuthenticated && <Route path="*" element={<LoginForm />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
