import { createContext, useEffect, useState } from "react"
import { lookInSession } from "./common/session";
import { Routes, Route } from "react-router-dom"
import Home from './pages/home.page'
import SignIn from "./pages/auth/signin.page";
import SignUp from "./pages/auth/signup.page";
import SideNav from "./components/sidenavbar.component";
import PathWheel from "./pages/pathwheel/pathwheel";
import OrdersPage from "./pages/pathwheel/orders";
import ProfilePage from "./pages/profile/profile.page";
import WheelchairsPage from "./pages/wheelchairs.page";
import ChangePassword from "./pages/auth/changepassword.page";

export const UserContext = createContext({});

function App() {

  let [userAuth, setuserAuth] = useState({});

  useEffect(
    () => {
      let userInSession = lookInSession("user");
      userInSession ? setuserAuth(JSON.parse(userInSession)) : setuserAuth({ access_token: null })
    }, []);


  return (
    <UserContext.Provider value={{ userAuth, setuserAuth }}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/products' element={<WheelchairsPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/pathwheel' element={<SideNav />}>
          <Route index element={<PathWheel />} />
          <Route path='notifications' element={<h1>notifications</h1>} />
          <Route path='orders' element={<OrdersPage />} />
          <Route path='settings'>
            <Route path='profile' element={<ProfilePage />} />
            <Route path='change-password' element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>
    </UserContext.Provider >
  )

}

export default App
