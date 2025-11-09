import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import "./index.css";
import { BrowserRouter, Route, Routes,Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/UI/Navbar";
import Feed from "./pages/Feed";
// import CreatePost from "./pages/CreatePost";

function Layout() {
  return (
    <>
      <Navbar/>
      <main className="pt-20 w-full min-h-screen bg-gray-100">
        <Outlet />
      </main>
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/me" element={<Profile />} />
          <Route path="/feed" element={<Feed/>}></Route>
          {/* <Route path="/create" element={<CreatePost/>}></Route> */}
          
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
