/* eslint-disable react/prop-types */
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ViewSelect = ({ onTabClick = () => {}, className = "" }) => {
const initialData = [
    {
        text: "Dropdown",
        isActive: true,
    },
    {
        text: "Accordian",
        isActive: false,
    }
]
  const [tabs, setTabs] = useState(initialData);

  const handleTabClick = (index) => {
    const newTabs = tabs.map((tab, i) => ({
      ...tab,
      isActive: i === index,
    }));
    setTabs(newTabs);
    onTabClick(newTabs[index]);
  };

  return (
    <Box className="flex w-auto !overflow-x-auto pb-[20px] pt-[30px] !overflow-hidden">
      {tabs.map((info, index) => (
        <Box
          key={index}
          onClick={() => handleTabClick(index)}
          className={`flex flex-row !w-auto py-1 px-4 !items-center border-2 border-solid ${
            info.isActive
              ? "border-none !bg-blue-600 !text-white"
              : "border-blue-600"
          } items-center justify-center cursor-pointer`}
        >
          <Typography
            className={`${className} ${
              info.isActive ? "!text-white" : ""
            }  Poppins500 !text-[13px] leading-3`}
          >
            {info.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ViewSelect;