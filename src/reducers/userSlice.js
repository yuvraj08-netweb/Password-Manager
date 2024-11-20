import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuthUser } from "../utils";
import { auth, db } from "../firebase/config";


export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, thunkAPI) => {
    try {
      const user = await getAuthUser();
      console.log(user);
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.error("User data not found!");
        return thunkAPI.rejectWithValue("User data not found");
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
      console.log("user loggout successfull")
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
    isUser: false,
    userDetails: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
        state.isUser = true;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.loading = false;
        state.isUser = false;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.isUser = false;
        state.userDetails = null;
        state.selectedChat = null;
      })
      .addCase(logOutUser.rejected, (action) => {
        console.error(action.payload);
      })
  },
});

export default userSlice.reducer;
