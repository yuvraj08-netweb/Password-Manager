import ControlledAccordions from "./Accordian";
import { useEffect, useState } from "react";
import DropdownFilter from "./DropDown";
import "../index.css";
import ViewSelect from "./Tabs";
import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logOutUser } from "../reducers/userSlice";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const PasswordManager = () => {
  const [selectedTab, setSelectedTab] = useState("Dropdown");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userDetails?.id) return;

    const userDocRef = doc(db, "users", userDetails.id);

    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        dispatch(fetchUserData(userData));
      } else {
        console.error("No such document!");
      }
    });

    return () => unsubscribe();
  }, [userDetails?.id, dispatch]);

  const handleViewChange = (tab) => {
    setSelectedTab(tab.text);
  };

  const handleLogOut = () => {
    dispatch(logOutUser())
      .unwrap()
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <div>
      <div className="App">
        <div className="max-w-[90%] mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span onClick={handleLogOut}>
              <Tooltip title="Logout">
                <IconButton className="!pl-0">
                  <LogoutIcon className="text-gray-400" />
                </IconButton>
              </Tooltip>
            </span>
            <h1 className="text-xl font-bold my-4 font-sour">
              Password Manager
            </h1>
          </div>
          <Link to="/add-new-data">
            <Tooltip title="Add New Project">
              <IconButton className="!px-2 !py-1 !text-xs !bg-blue-600 !rounded-lg !text-white">
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
        <div className="max-w-[90%] mx-auto">
          <ViewSelect onTabClick={handleViewChange} />
        </div>
        <div>
          {selectedTab === "Dropdown" ? (
            <DropdownFilter />
          ) : (
            <ControlledAccordions />
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;
