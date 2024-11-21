import { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";

export default function DropdownFilter() {
  const [selectedProject, setSelectedProject] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { userCredentials } = useSelector((state) => state.user);
  const handleChange = (event) => {
    setSelectedProject(event.target.value);
  };
  const openInNewTab = (url) => {
    // eslint-disable-next-line no-undef
    chrome.tabs.create({ url });
  };

  const filteredData = userCredentials?.credentials?.find(
    (cred) => cred.project === selectedProject
  );

  return (
    <Box sx={{ width: "90%", margin: "auto" }}>
      <FormControl
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "gray",
            },
            "&:hover fieldset": {
              borderColor: "gray",
            },
            "&.Mui-focused fieldset": {
              borderColor: "gray",
            },
            "& .MuiSelect-icon": {
              color: "gray",
            },
          },
        }}
      >
        <InputLabel
          id="project-select-label"
          className="!top-[16px] !relative dark:!text-white"
        >
          Select a Project
        </InputLabel>
        <Select
          labelId="project-select-label"
          value={selectedProject}
          onChange={handleChange}
          label={<div className="">Select a Project</div>}
          className="dark:!text-white"
          slotProps={{
            root: {
              className: "custom-select-root dark:bg-gray-800 ",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 150,
              },
            },
          }}
        >
          <MenuItem className="!text-[0.875rem] !min-h-max" value="">
            <em>None</em>
          </MenuItem>
          {userCredentials?.credentials?.map((cred,idx) => (
            <MenuItem
              className="!text-[0.875rem] !min-h-max"
              key={idx}
              value={cred.project}
            >
              {cred.project}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {filteredData && (
        <Box
          sx={{
            marginTop: 4,
            padding: 3,
            borderRadius: 3,
            backgroundColor: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
          }}
          className="border border-solid border-[#ccc] dark:border-none dark:!bg-gray-800 mb-5"
        >
          <Typography
            variant="h6"
            gutterBottom
            className="!text-black dark:!text-white !font-bold !text-[16px]"
          >
            {filteredData.project}
          </Typography>
          <Divider className="!bg-gray-500"/>
          <Typography className="flex justify-between items-center !my-2 !text-sm ">
            <h5 className="!text-black dark:!text-white">Project URL : </h5>
            <Button
              className="!text-black dark:!text-white !text-[15px] !p-0 !normal-case !m-0"
              onClick={()=>{openInNewTab(filteredData.url)}}
            >
              {filteredData.url}
            </Button>
          </Typography>
          <Divider className="!bg-gray-500"/>
          <Typography className="flex justify-between items-center !my-1 !text-sm">
            <h5 className="!text-black  dark:!text-white">Username : </h5>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={filteredData.username}
                className="border border-blue-950 px-5 py-2 rounded-lg max-w-[165px] !text-black "
                readOnly
              />
              <ContentCopyIcon
                onClick={() =>
                  navigator.clipboard.writeText(filteredData.username)
                }
                className="text-blue-500 cursor-pointer hover:text-blue-700 transition"
                size={24}
              />
            </div>
          </Typography>
          <Divider className="!bg-gray-500"/>
          <Typography className="flex justify-between items-center !my-1 !text-sm">
            <h5 className="!text-black  dark:!text-white">Password : </h5>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={filteredData.password}
                  className="border border-blue-950 px-5 py-2 rounded-lg max-w-[165px] !text-black"
                  readOnly
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-500 cursor-pointer hover:text-blue-700"
                >
                  {showPassword ? (
                    <VisibilityOffIcon size={20} />
                  ) : (
                    <VisibilityIcon size={20} />
                  )}
                </span>
              </div>

              <ContentCopyIcon
                onClick={() =>
                  navigator.clipboard.writeText(filteredData.password)
                }
                className="text-blue-500 cursor-pointer hover:text-blue-700 transition"
                size={24}
              />
            </div>
          </Typography>
        </Box>
      )}
    </Box>
  );
}
