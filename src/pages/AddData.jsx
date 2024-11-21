import { Link } from "react-router-dom";
import AddDataForm from "../components/forms/AddDataForm";
import { IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddData = () => {
  return (
    <div className="!w-full !h-[100vh] flex items-center justify-center bg-slate-100 dark:!bg-[#14181B]">
      <div className="bg-white dark:!bg-gray-800 !w-[80%] mx-auto px-5 py-5 rounded-lg">
        <div className="header flex items-center">
          <Link to="/userArea">
            <Tooltip title="Go Back">
              <IconButton className="!pl-0">
                <ArrowBackIcon className="text-gray-400" />
              </IconButton>
            </Tooltip>
          </Link>

          <h2 className="font-bold text-xl">Add New Project</h2>
        </div>
        <AddDataForm />
      </div>
    </div>
  );
};

export default AddData;
