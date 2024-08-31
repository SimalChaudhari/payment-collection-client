import React, { useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { totalData } from "@/store/action/home.action";
import { Helmet } from 'react-helmet-async';

// Map dynamic keys to their corresponding icons and titles
const iconMapping = {
  totalAmount: {
    title: "Total Amount",
    icon: BanknotesIcon,
    formatValue: (value) => `₹${value}`, // Formatting for amount
  },
  customerCount: {
    title: "Customers",
    icon: UsersIcon,
    formatValue: (value) => value.toString(), // Convert to string
  },
  salesmanCount: {
    title: "Salesmen",
    icon: UserPlusIcon,
    formatValue: (value) => value.toString(), // Convert to string
  },
};

export function Home() {

  const dispatch = useDispatch()

  const dynamicData = useSelector((state) => state.homeReducer.total);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(totalData());
    };
  
    fetchData();
  }, [dispatch]);


  // Create statisticsCardsData from dynamicData and iconMapping
  const statisticsCardsData = Object.keys(dynamicData).map((key) => {
    const { title, icon, formatValue } = iconMapping[key];
    return {
      title,
      value: formatValue(dynamicData[key]),
      icon,
    };
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>{'Admin Panel | Dashboard'}</title>
      </Helmet>

      <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {statisticsCardsData.map(({ title, value, icon: Icon }) => (
            <StatisticsCard
              key={title}
              title={title}
              value={value}
              icon={<Icon className="w-6 h-6 text-white" />}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  {/* Additional footer content if needed */}
                </Typography>
              }
            />
          ))}
        </div>
      </div>

    </React.Fragment>
  );
}

export default Home;
