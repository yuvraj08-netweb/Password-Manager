import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserArea from "./pages/UserArea";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import AddData from "./pages/AddData";
import { getProducts, setCurrentUser } from "./reducers/userSlice";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/config";
import { useDispatch } from "react-redux";
import PageLoader from "./components/Common/PageLoader";

const App = () => {

  const [showSplashScreen, setShowSplashScreen] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setShowSplashScreen(true);  
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        getDoc(userDocRef).then(() => {
          dispatch(
            setCurrentUser({
              email: user.email,
              id: user.uid,
              accessToken: user.accessToken,
            })
          );
          dispatch(getProducts(user.uid));
          setShowSplashScreen(false);
        });
      } else {
        setShowSplashScreen(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (showSplashScreen) {
    return <PageLoader />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<PublicLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateLayout />}>
          <Route path="/userArea" element={<UserArea />} />
          <Route path="/add-new-data" element={<AddData />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
