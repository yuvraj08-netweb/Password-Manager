import { Link } from "react-router-dom";
import AddDataForm from "../components/forms/AddDataForm";
import { IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddData = () => {
  return (
    <div className="!w-full !h-[100vh] flex items-center justify-center bg-slate-100">
      <div className="bg-white !w-[80%] mx-auto px-5 py-5">
        <div className="header flex items-center">
          <Link to="/userArea">
            <Tooltip title="Go Back">
              <IconButton className="!pl-0">
                <ArrowBackIcon />
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
