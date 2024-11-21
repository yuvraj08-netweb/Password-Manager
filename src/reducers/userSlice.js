import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
// import { getAuthUser } from "../utils";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const register = createAsyncThunk(
  "user/register",
  async (data, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.emailId,
        data.password
      );
      const user = auth.currentUser || userCredential.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          id: user.uid,
          email: user.email,
        }).then(async () => {
          await setDoc(doc(db, "credentials", user.uid), {
            id: user.uid,
            credentials: [],
          }).then(() => {
            console.log("user registered!");
          });
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      await signInWithEmailAndPassword(auth, userData.emailId, userData.password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  "user/addProduct",
  async ({ userDetails, dataObject }, thunkAPI) => {
    try {
      const credentialsRef = collection(db, "credentials");
      const credentialsDocRef = doc(credentialsRef, userDetails.id);
      await updateDoc(credentialsDocRef, {
        credentials: arrayUnion({
          project: dataObject.project,
          url: dataObject.url,
          username: dataObject.username,
          password: dataObject.password,
        }),
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProducts = createAsyncThunk(
  "user/getProducts",
  async (userDetails, thunkAPI) => {
    try {
      const docSnap = await getDoc(doc(db, "credentials", userDetails));
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.error("User data not found!");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "user/logOutUser",
  async (_, thunkAPI) => {
    try {
      auth.signOut();
    } catch (error) {
      console.error("Log Out Failed");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: null,
    userDetails: null,
    userCredentials: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.userDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOutUser.fulfilled, (state) => {
        state.userDetails = null;
        state.userCredentials= null;
      })
      .addCase(logOutUser.rejected, (_,action) => {
        console.error(action.payload);
      })
      .addCase(getProducts.fulfilled, (state,action) => {
        state.userCredentials = action.payload;
      })
      .addCase(getProducts.rejected, (_, action) => {
        console.error(action.payload);
      })
  },
});

export const { setCurrentUser, setUserCredentials } = userSlice.actions;

export default userSlice.reducer;
