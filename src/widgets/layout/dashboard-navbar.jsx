import { useLocation, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/action/auth.action";
import { notification, notificationUpdate } from "@/store/action/notification.action";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const sidenavRef = useRef(null);

  const userEmail = useSelector((state) => state.authReducer.user.user.email);
  const UserData = useSelector((state) => state.authReducer.user.user.role);
  const UserID = useSelector((state) => state.authReducer.user.user._id);


  const navigate = useNavigate();
  const dispatchLog = useDispatch();

  function getRelativeTime(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const timeDifference = now - date;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days === 0) {
      if (hours === 0) {
        if (minutes === 0) {
          return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
        }
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
      }
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }

    if (days === 1) return '1 day ago';
    if (days < 30) return `${days} days ago`;
    if (days < 365) return `${Math.floor(days / 30)} month${Math.floor(days / 30) === 1 ? '' : 's'} ago`;

    return `${Math.floor(days / 365)} year${Math.floor(days / 365) === 1 ? '' : 's'} ago`;
  }



  const paymentsData = useSelector((state) => state.notificationReducer.notification);



  const fetchData = async () => {
    await dispatchLog(notification(UserID));
  };
  useEffect(() => {

    fetchData();
  }, []);


  const handleUpdate = async (id) => {
    console.log(id)
    const res = await dispatchLog(notificationUpdate(id));
    if (res === true)
      fetchData()
  }


  // Use for sidebar true false when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
        setOpenSidenav(dispatch, false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleLogout = async () => {
    const log = await dispatchLog(logout());
    if (log) {
      navigate("/sign-in");
    }
  };



  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
        : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
      ref={sidenavRef} // Attach ref to Navbar
    >
      <div className="flex justify-between items-center">
        {/* Left side: Bars3Icon */}
        <div className="flex items-center">
          <IconButton
            variant="text"
            color="blue-gray"
            className="xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
        </div>

        {/* Center: Breadcrumbs and Page Title */}
        <div className="flex flex-col items-center capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
              }`}
          ></Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>

        {/* Right side: Icons */}
        <div className="flex items-center ml-auto">
          <Menu>
            <MenuHandler>
              <IconButton
                variant="text"
                color="blue-gray"
                className="xl:flex items-center gap-1 px-4"
              >
                <UserCircleIcon className="h-8 w-8 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {userEmail}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  Logout
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>

          {UserData === "customer" && (
            <Menu>
              <MenuHandler>
                <IconButton variant="text" color="blue-gray">
                  <BellIcon className="h-5 w-5 text-blue-gray-500" />
                </IconButton>
              </MenuHandler>
              <MenuList className="w-auto border-0">
                <MenuItem className="flex flex-col gap-4">
                  {paymentsData.length > 0 ? (
                    paymentsData.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                            <CreditCardIcon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="mb-1 font-normal"
                            >
                              {payment.message}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="flex items-center gap-1 text-xs font-normal opacity-60"
                            >
                              <ClockIcon className="h-3.5 w-3.5" /> {getRelativeTime(payment.createdAt)}
                            </Typography>
                          </div>
                        </div>
                        <div
                          className="cursor-pointer"
                          aria-label="Close notification"
                          onClick={() => {handleUpdate(payment._id)}}
                        >
                          <XMarkIcon className="h-4 w-4 text-blue-gray-500" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="text-center text-xs font-normal mb-2"
                      >
                        No notifications available
                      </Typography>
                    </div>
                  )}
                </MenuItem>


              </MenuList>

            </Menu>
          )}
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
