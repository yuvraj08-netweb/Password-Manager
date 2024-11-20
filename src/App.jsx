import ControlledAccordions from "./components/Accordian";
import { useState } from "react";
import DropdownFilter from "./components/DropDown";
import "./index.css";
import ViewSelect from "./components/Tabs";

const App = () => {
  const [selectedTab, setSelectedTab] = useState("Dropdown");

  const handleViewChange = (tab) =>{
    setSelectedTab(tab.text)
  }
  return (
    <div className="App">
      <div className="max-w-[90%] mx-auto">
        <h1 className="text-center text-2xl font-bold my-4 font-sour">
          Password Manager
        </h1>
        <ViewSelect onTabClick={handleViewChange}/>
      </div>

      <div>{selectedTab === "Dropdown" ? <DropdownFilter /> : <ControlledAccordions />}</div>
    </div>
  );
};

export default App;
