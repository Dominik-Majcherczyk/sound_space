import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppBar } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import logo from "../../images/soundspace-logo.png";
import userProfile from "../../images/user-profile.png";
import { ReactComponent as Svg1 } from "../../svg/svg1.svg";
import { ReactComponent as Svg2 } from "../../svg/svg2.svg";
import { ReactComponent as Svg3 } from "../../svg/svg2.svg";

import decode from "jwt-decode";
export default function Navbar({ favFilter, setFavFilter }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log(user);
  const [menuActive, setMenuActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleFavs = () => {
    setFavFilter(!favFilter);
  };
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
    toggleMenu();
  };

  useEffect(() => {
    const token = user?.token;

    //wylogowanie po upłynięcu czasu tokena (na ten moment 1h)
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [navigate]);
  return (
    <AppBar position="static" color="inherit">
      {/* <Typography variant="h2" align="center">
           Songs
        </Typography>
        <div>
                {user ? (
                    <div>
                        <img className="avatar" alt={user.result.name} src={user.result.imageUrl}/>
                        <h5>{user.result.name}</h5>
                        <button onClick={logout}>logout</button>
                    </div>
                ):(
                    <Link to="/auth">Sign IN</Link>
                )}
            </div> */}

      <div>
        <nav className="bg-white dark:bg-gray-800  shadow py-4 ">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between h-16">
              <div className=" flex items-center  ">
                <a className="flex-shrink-0 hidden md:block" href="/">
                  <img className="h-12 w-12" src={logo} alt="Workflow" />
                </a>
                <div className="hidden lg:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a
                      className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                      href="/#"
                    >
                      Home
                    </a>
                    <a
                      className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                      href="/#"
                      onClick={toggleFavs}
                    >
                      Favourites
                    </a>
                    {user ? (
                      <a
                        className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                        href={`/profile/${user.result._id}`}
                      >
                        Profile
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="block">
                <div className="ml-4 flex items-center md:ml-6">
                  <div className="ml-3 relative">
                    <div className="relative inline-block text-left">
                      <div>
                        {user ? (
                          <div className="flex flex-row  items-center justify-center">
                            <button
                              type="button"
                              className="  flex items-center justify-center rounded-md  px-1 py-2 text-sm font-medium text-gray-700 dark:text-gray-50  "
                              id="options-menu"
                              onClick={toggleMenu}
                            >
                              <div className="h-8 w-8">
                                {user.result.imageUrl ? (
                                  <img
                                    className="rounded-full "
                                    alt={user?.result.name}
                                    src={user?.result.imageUrl}
                                  />
                                ) : (
                                  <img
                                    className="rounded-full "
                                    alt={user?.result.name}
                                    src={userProfile}
                                  />
                                )}
                              </div>
                            </button>
                            <p>{user?.result.name}</p>
                          </div>
                        ) : (
                          <Link to="/auth">Sign IN</Link>
                        )}
                      </div>
                      {menuActive ? (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                          <div
                            className="py-1 "
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                          >
                            {/* <a
                            href="#"
                            className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                            role="menuitem"
                          >
                            <span className="flex flex-col">
                              <span>Settings</span>
                            </span>
                          </a>
                          <a
                            href="#"
                            className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                            role="menuitem"
                          >
                            <span className="flex flex-col">
                              <span>Account</span>
                            </span>
                          </a> */}
                            <a
                              onClick={logout}
                              className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                              role="menuitem"
                            >
                              <span className="flex flex-col">
                                <span>Logout</span>
                              </span>
                            </a>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex lg:hidden">
                <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                  <Svg3 />
                </button>
              </div>
            </div>
          </div>
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/#"
              >
                Home
              </a>
              <a
                className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/#"
              >
                Gallery
              </a>
              <a
                className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/#"
              >
                Content
              </a>
              <a
                className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/#"
              >
                Contact
              </a>
            </div>
          </div>
        </nav>
      </div>
    </AppBar>
  );
}
