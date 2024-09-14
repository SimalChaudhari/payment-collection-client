// routes.js
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  CreditCardIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

import {Home} from "@/pages/Admin/dashboard";
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
      { icon: <HomeIcon {...icon} />, name: "dashboard", path: "/home", element: <Home /> },
      { icon: <UserIcon {...icon} />, name: "Customer", path: "/customers", element: <View /> },
      { icon: <UserCircleIcon {...icon} />, name: "Salesman", path: "/salesmans", element: <ViewSalesman /> },
      { icon: <CreditCardIcon {...icon} />, name: "Payment", path: "/payments", element: <Payment /> },
      { icon: <InformationCircleIcon {...icon} />, name: "Report", path: "/reports", element: <ReportData /> },
      { icon: <InformationCircleIcon {...icon} />, name: "Address", path: "/address", element: <ViewAddress /> },
      { icon: <UserCircleIcon {...icon} />, name: "Profile", path: "/profile", element: <AdminProfile /> },
      // { path: "*", element: <NotFound /> }, // 404 Page
    ],
  },
];

export const salesmanRoutes = [
  {
    layout: "salesman",
    pages: [
      { icon: <HomeIcon {...icon} />, name: "dashboard", path: "/home", element: <HomeSalesman /> },
      { icon: <UserIcon {...icon} />, name: "Collection", path: "/collections", element: <Collection /> },
      { icon: <UserCircleIcon {...icon} />, name: "Profile", path: "/profile", element: <AdminProfile /> },
      // { path: "*", element: <NotFound /> }, // 404 Page
    ],
  },
];

export const customerRoutes = [
  {
    layout: "customer",
    pages: [
      { icon: <HomeIcon {...icon} />, name: "dashboard", path: "/home", element: <CustomerDashboard /> },
      { icon: <CreditCardIcon {...icon} />, name: "Verify Payment", path: "/verify", element: <PaymentVerify /> },
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
