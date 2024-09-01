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
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/action/auth.action";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const sidenavRef = useRef(null);

  const userEmail = useSelector((state) => state.authReducer.user.user.email);
  const UserData = useSelector((state) => state.authReducer.user.user.role);

  const navigate = useNavigate();
  const dispatchLog = useDispatch();

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
      className={`rounded-xl transition-all ${
        fixedNavbar
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
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
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
             <MenuList className="w-max border-0">
               <MenuItem className="flex items-center gap-3">
                 <Avatar
                   src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                   alt="item-1"
                   size="sm"
                   variant="circular"
                 />
                 <div>
                   <Typography
                     variant="small"
                     color="blue-gray"
                     className="mb-1 font-normal"
                   >
                     <strong>New message</strong> from Laur
                   </Typography>
                   <Typography
                     variant="small"
                     color="blue-gray"
                     className="flex items-center gap-1 text-xs font-normal opacity-60"
                   >
                     <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                   </Typography>
                 </div>
               </MenuItem>
               <MenuItem className="flex items-center gap-4">
                 <Avatar
                   src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                   alt="item-1"
                   size="sm"
                   variant="circular"
                 />
                 <div>
                   <Typography
                     variant="small"
                     color="blue-gray"
                     className="mb-1 font-normal"
                   >
                     <strong>New album</strong> by Travis Scott
                   </Typography>
                   <Typography
                     variant="small"
                     color="blue-gray"
                     className="flex items-center gap-1 text-xs font-normal opacity-60"
                   >
                     <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                   </Typography>
                 </div>
               </MenuItem>
               <MenuItem className="flex items-center gap-4">
                 <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                   <CreditCardIcon className="h-4 w-4 text-white" />
                 </div>
                 <div>
                   <Typography
                     variant="small"
                     color="blue-gray"
                     className="mb-1 font-normal"
                   >
                     Payment successfully completed
                   </Typography>
                   <Typography
                     variant="small"
                     color="blue-gray"
                     className="flex items-center gap-1 text-xs font-normal opacity-60"
                   >
                     <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                   </Typography>
                 </div>
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
