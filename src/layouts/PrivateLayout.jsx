import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import PageLoader from "../components/Common/PageLoader";
import { fetchUserData } from "../reducers/userSlice";

const PrivateLayout = () => {
  const { userDetails } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(fetchUserData())
      .unwrap()
      .then(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (typeof loading === "object") {
      return;
    }
    if (!loading && userDetails === null) {
      navigate("/login");
    }
    
  }, [navigate, userDetails?.fullName,loading,userDetails]);

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
