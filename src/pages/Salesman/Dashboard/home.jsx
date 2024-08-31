import React, { useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { collectionCount } from "@/store/action/home.action";

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
};

export function Home() {

  const dispatch = useDispatch()

  const dynamicData = useSelector((state) => state.homeReducer.salesmanTotal);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(collectionCount());
    };
  
    fetchData();
  }, []); // Empty dependency array ensures it runs only once when the component mounts.
  

  // Create statisticsCardsData from dynamicData and iconMapping
  const statisticsCardsData = Object.keys(dynamicData).map((key) => {
    const { title, icon, formatValue } = iconMapping[key];
    console.log("🚀 ~ statisticsCardsData ~ formatValue:", formatValue)
    return {
      title,
      value: formatValue(dynamicData[key]),
      icon,
    };
  });

  return (
    
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
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
  );
}

export default Home;
