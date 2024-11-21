import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider, Link } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const { userDetails } = useSelector((state) => state.user);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="w-[90%] mx-auto flex flex-col gap-2 !mb-5 ">
      <div className="mt-5 max-h-[500px] overflow-y-auto">
        {userDetails?.credentials?.map((project, idx) => {
          return (
            <Accordion
              expanded={expanded === `panel-${idx}`}
              onChange={handleChange(`panel-${idx}`)}
              key={idx}
              className="dark:!text-white"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="dark:!text-white" />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className="font-bold !bg-[#eeeeee] dark:!bg-gray-800"
              >
                <Typography className="font-ubuntu">
                  {project.project}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="dark:!bg-[#0F1214] border border-solid dark:!border-none">
                <div className="flex flex-col gap-3 pt-3">
                  <div className="project-url flex justify-between">
                    <h4 className="max-w-max !text-[14px]">Project URL :</h4>
                    <span>
                      <Link href={project.url} target="_blank">
                        {project.url}
                      </Link>
                    </span>
                  </div>
                  <Divider />
                  <div className="project-username flex justify-between items-center">
                    <h4 className="max-w-max !text-[14px]">Username : </h4>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={project.username}
                        className="border border-blue-950 px-5 py-2 rounded-lg max-w-[165px] !text-black"
                        readOnly
                      />
                      <ContentCopyIcon
                        onClick={() =>
                          navigator.clipboard.writeText(project.username)
                        }
                        className="text-blue-500 cursor-pointer hover:text-blue-700 transition"
                        size={24}
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className="project-password flex justify-between items-center">
                    <h4 className="max-w-max !text-[14px] ">Password :</h4>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={project.password}
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
                          navigator.clipboard.writeText(project.password)
                        }
                        className="text-blue-500 cursor-pointer hover:text-blue-700 transition"
                        size={24}
                      />
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
