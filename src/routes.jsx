import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  CreditCardIcon,
  UserIcon ,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/Admin/dashboard";
import View from "./pages/Admin/customer/view";

import ViewSalesman from './pages/Admin/salesman/ViewSalesman';
import Payment from "./pages/Admin/payment/payment";
import Collection from "./pages/Salesman/collection";
import HomeSalesman from "./pages/Salesman/Dashboard/home";
import AdminProfile from "./pages/Admin/profile/adminProfile";
import History from "./pages/Customer/History/history";
import CustomerDashboard from "./pages/Customer/Dashboard/customerDashboard";
import PaymentVerify from "./pages/Customer/PaymentVerify/paymentVerify";
import ReportData from "./pages/Admin/report/report";


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "admin",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserIcon  {...icon} />,
        name: "Customer",
        path: "/customer",
        element: <View />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Salesman",
        path: "/salesman",
        element: <ViewSalesman />,
      },
      {
        icon: <CreditCardIcon {...icon} />,
        name: "Payment",
        path: "/payment",
        element: <Payment />,
      },

      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Report",
        path: "/report",
        element: <ReportData />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <AdminProfile />,
      },
    ],
  },
];
export const routesSalesman = [
{
  layout: "salesman",
  pages: [
    {
      icon: <HomeIcon {...icon} />,
      name: "dashboard",
      path: "/home",
      element: <HomeSalesman />,
    },
    {
      icon: <UserIcon  {...icon} />,
      name: "Salesman",
      path: "/customers",
      element: <Collection/>,
    },
    {
      icon: <UserCircleIcon {...icon} />,
      name: "profile",
      path: "/profile",
      element: <AdminProfile />,
    },
  ],
}]

export const routesCustomer = [
  {
    layout: "customer",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <CustomerDashboard/>,
      },
      {
        icon: <CreditCardIcon {...icon} />,
        name: "verifyPayment",
        path: "/verify",
        element: <PaymentVerify />,
      },

      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <AdminProfile />,
      },
    ],
  }]
