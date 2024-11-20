import { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Link,
  Box,
  Divider,

} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import credentials from "../data/credentials.json";

export default function DropdownFilter() {
  const [selectedProject, setSelectedProject] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (event) => {
    setSelectedProject(event.target.value);
  };

  
  const filteredData = credentials.find(
    (cred) => cred.project === selectedProject
  );

  return (
    <Box sx={{ width: "90%", margin: "auto" }}>
      {/* Dropdown */}
      <FormControl
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "gray", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "gray", // Hover border color
            },
            "&.Mui-focused fieldset": {
              borderColor: "gray", // Focused border color
            },
            "& .MuiSelect-icon": {
              color: "gray", // Change dropdown icon color
            },
          },
        }}
      >
        <InputLabel id="project-select-label" className="!top-[16px] !relative dark:!text-white">
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
              className: "custom-select-root dark:bg-gray-800 ", // Add custom classes here
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 150,
                top: "243px !important"
              },
            },
          }}
        >
          <MenuItem className="!text-[0.875rem] !min-h-max" value="">
            <em>None</em>
          </MenuItem>
          {credentials.map((cred) => (
            <MenuItem className="!text-[0.875rem] !min-h-max" key={cred.id} value={cred.project}>
              {cred.project}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Display Selected Project Data */}
      {filteredData && (
        <Box
          sx={{
            marginTop: 4,
            padding: 3,
            border: "1px solid #ccc",
            borderRadius: 3,
            backgroundColor: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            rowGap: "5px",
          }}
          className="glassCard"
        >
          <Typography variant="h6" gutterBottom className="!text-black !font-bold">
            {filteredData.project}
          </Typography>
          <Divider />
          <Typography className="flex justify-between items-center !my-4 !text-sm ">
            <h4 className="!text-black">Project URL : </h4>
            <Link
              href={filteredData.url}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              className="dark:!text-black"
            >
              {filteredData.url}
            </Link>
          </Typography>
          <Divider />
          <Typography className="flex justify-between items-center !my-3 !text-sm">
            <h4 className="!text-black">Username : </h4>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={filteredData.username}
                className="border border-blue-950 px-5 py-2 rounded-lg max-w-[165px] !text-black"
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
          <Divider />
          <Typography className="flex justify-between items-center !my-3 !text-sm">
            <h4 className="!text-black">Password : </h4>
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
