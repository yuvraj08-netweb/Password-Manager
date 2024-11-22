import { useEffect, useState } from "react";
import {useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import PageLoader from "../components/Common/PageLoader";

const PrivateLayout = () => {
  const { userDetails } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails === null) {
      navigate("/login");
      setLoading(false)
    }
    setLoading(false);
  }, [navigate, userDetails]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateLayout;
