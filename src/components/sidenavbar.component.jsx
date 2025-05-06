import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom"
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";


const SideNav = () => {

    let { userAuth: { access_token, new_notification_available }, setuserAuth } = useContext(UserContext);

    let page = location.pathname.split('/pathwheel').pop()

    let [pageState, setpageState] = useState(page.replace('-', ' '));

    let [showSideNav, setshowSideNav] = useState(false)

    let activeTabLine = useRef(null);
    let sideBarIcon = useRef(null);
    let pageStateTab = useRef(null);



    const changePageState = (e) => {

        let { offsetWidth, offsetLeft } = e.target;
        activeTabLine.current.style.width = `${offsetWidth}px`;
        activeTabLine.current.style.left = `${offsetLeft}px`;

        if (e.target === sideBarIcon.current) {
            setshowSideNav(true);
        } else {
            setshowSideNav(false);
        }
    }

    useEffect(() => {
        setshowSideNav(false);
        pageStateTab.current.click();
    }, [pageState])


    const handelSignout = (e) => {
        removeFromSession('user');
        setuserAuth({ access_token: null });
    }



    return (
        access_token === null ?
            <Navigate to="/signin" />
            :
            <>
                <section className="px-[5vw] md:px-[7vw] lg:px-[10vw] relative flex gap-10 py-0 m-0 max-md:flex-col  ">
                    <div className="sticky top-[20px] z-30">
                        <div className="md:hidden bg-white py-1 border-b border-grey flex flex-nowrap overflow-x-auto">
                            <button
                                onClick={changePageState}
                                ref={sideBarIcon}
                                className="p-5 capitalize">
                                <i className="fi fi-rr-bars-staggered pointer-events-none" />
                            </button>
                            <button
                                onClick={changePageState}
                                ref={pageStateTab}
                                className="p-5 capitalize">
                                {pageState}
                            </button>
                            <hr ref={activeTabLine} className="absolute bottom-0 duration-500" />
                        </div>

                        <div className={" min-w-[200px] h-[calv(100vh-80px-60px)] md:h-cover md:sticky top-24 overflow-y-auto p-6 md:pr-0 md:border-grey md:border-r absolute max-md:top-[64px] bg-white max-md:w-[cal(100% + 80px)] max-md:px-16 max-md:-ml-7 duration-500 "
                            + (!showSideNav ? "max-md:opacity-0 max-md:pointer-events-none " : "opacity-100 pointer-events-auto ")}>
                            <h1 className="text-xl text-dark-grey mb-3">PathWheel</h1>
                            <hr className="border-green-50 -ml-6 mr-6 mb-8" />

                            <NavLink
                                to={"/pathwheel"}
                                className="flex gap-4 items-center py-5 text-dark-grey hover:text-black"
                                onClick={(e) => setpageState(e.target.innerText)}>
                                <i className="fi fi-rr-home" />
                                Home
                            </NavLink>

                            <NavLink
                                to={"/pathwheel/notifications"}
                                className="flex gap-4 items-center py-5 text-dark-grey hover:text-black"
                                onClick={(e) => setpageState(e.target.innerText)}>


                                <div className="relative">
                                    <i className="fi fi-bs-bell" />
                                    {
                                        new_notification_available ?
                                            <span className='bg-red w-2 h-2 rounded-full absolute z-10 top-0 right-0'>
                                            </span> :
                                            ""
                                    }
                                </div>
                                Notifications
                            </NavLink>

                            <NavLink
                                to={"/pathwheel/orders"}
                                className="flex gap-4 items-center py-5 text-dark-grey hover:text-black "
                                onClick={(e) => setpageState(e.target.innerText)}>
                                <i className="fi fi-rr-file-edit" />
                                Orders
                            </NavLink>


                            {/* ------------------------------------ Settings --------------------------------------------- */}
                            <h1 className="text-xl text-dark-grey mt-20 mb-3">Settings</h1>
                            <hr className="border-green-50 -ml-6 mr-6 mb-8" />
                            <NavLink
                                to={"/pathwheel/settings/profile"}
                                className="flex gap-4 items-center py-5 text-dark-grey hover:text-black"
                                onClick={(e) => setpageState(e.target.innerText)}>
                                <i className="fi fi-rr-user" />
                                Profile
                            </NavLink>
                            <NavLink
                                to={"/pathwheel/settings/change-password"}
                                className="flex gap-4 items-center py-5 text-dark-grey hover:text-black"
                                onClick={(e) => setpageState(e.target.innerText)}>
                                <i className="fi fi-rr-lock" />
                                Change Password
                            </NavLink>

                            <NavLink
                                className="flex gap-4 items-center py-5 text-dark-grey hover:red-black"
                                onClick={handelSignout}>
                                <i className="fi fi-rr-lock" />
                                Logout
                            </NavLink>

                        </div>


                    </div>

                    <div className="max-md:-mt-2 mt-15 w-full ">
                        <Outlet />
                    </div>

                </section >

            </>
    );
}

export default SideNav;