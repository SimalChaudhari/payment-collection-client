// routes.js
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  CreditCardIcon,
  UserIcon, CogIcon
} from "@heroicons/react/24/solid";



import { Home } from "@/pages/Admin/dashboard";
import View from "@/pages/Admin/customer/view";
import ViewSalesman from "@/pages/Admin/salesman/ViewSalesman";
import Payment from "@/pages/Admin/payment/payment";
import Collection from "@/pages/Salesman/collection";
import HomeSalesman from "@/pages/Salesman/Dashboard/home";
import AdminProfile from "@/pages/Admin/profile/adminProfile";
import History from "@/pages/Customer/History/history";
import CustomerDashboard from "@/pages/Customer/Dashboard/customerDashboard";
import PaymentVerify from "@/pages/Customer/PaymentVerify/paymentVerify";
import ReportData from "@/pages/Admin/report/report";
import ViewAddress from "./pages/Address/addressView";
// import NotFound from "@/pages/NotFound"; // 404 Page

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const adminRoutes = [
  {
    layout: "admin",
    pages: [
      { icon: <HomeIcon {...icon} />, name: "Dashboard", path: "/dashboard", element: <Home /> },
      { icon: <UserIcon {...icon} />, name: "Customers", path: "/customers", element: <View /> },
      { icon: <UserCircleIcon {...icon} />, name: "Salesmans", path: "/salesmans", element: <ViewSalesman /> },
      { icon: <CreditCardIcon {...icon} />, name: "Payments", path: "/payments", element: <Payment /> },
      { icon: <InformationCircleIcon {...icon} />, name: "Reports", path: "/reports", element: <ReportData /> },
      { icon: <UserCircleIcon {...icon} />, name: "Profile", path: "/profile", element: <AdminProfile /> },
      { icon: <CogIcon {...icon} />, name: "Setting", path: "/setting", element: <ViewAddress /> },

      // { path: "*", element: <NotFound /> }, // 404 Page
    ],
  },
];

export const salesmanRoutes = [
  {
    layout: "salesman",
    pages: [
      { icon: <HomeIcon {...icon} />, name: "Dashboard", path: "/dashboard", element: <HomeSalesman /> },
      { icon: <UserIcon {...icon} />, name: "Collections", path: "/collections", element: <Collection /> },
      { icon: <UserCircleIcon {...icon} />, name: "Profile", path: "/profile", element: <AdminProfile /> },
      // { path: "*", element: <NotFound /> }, // 404 Page
    ],
  },
];

export const customerRoutes = [
  {
    layout: "customer",
    pages: [
      { icon: <HomeIcon {...icon} />, name: "Dashboard", path: "/dashboard", element: <CustomerDashboard /> },
      { icon: <CreditCardIcon {...icon} />, name: "Payments", path: "/payments", element: <PaymentVerify /> },
      { icon: <UserCircleIcon {...icon} />, name: "Profile", path: "/profile", element: <AdminProfile /> },
      // { path: "*", element: <NotFound /> }, // 404 Page
    ],
  },
];

export const authRoutes = [
  {
    layout: "auth",
    pages: [
      // Add auth routes like sign-in, sign-up here
    ],
  },
];
