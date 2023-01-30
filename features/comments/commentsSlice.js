import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";

//Here it is. Going to work on writing the async function and wrapping this shirt up tomorrow.

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await fetch(baseUrl + "comments");
    if (!response.ok) {
      return Promise.reject("Unable to fetch, status: " + response.status);
    }
    const data = await response.json();
    console.log("in fetch cimiee", data)
    return data;
  }
);

export const postComments = createAsyncThunk(
  "comments/postComments",
  async (payload, { dispatch, getState }) => {
    setTimeout(() => {
      const { comments } = getState();
      console.log("comments!!", comments);
      payload = {
        ...payload,
        id: comments.commentsArray.length,
        date: Date().toString(),
      };
      console.log("post comment payload", payload);
      dispatch(addComment(payload))
      return;
    }, 1000);
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: { isLoading: true, errMess: null, commentsArray: [] },
  reducers: {
    addComment(state, action) {
      console.log('add comment')
      return {
        ...state,
        commentsArray: [...state.commentsArray, action.payload],
      };
    },
  },

  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMess = null;
      state.commentsArray = action.payload;
    },
    [fetchComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMess = action.error ? action.error.message : "Fetch failed";
    },
    [postComments.pending]: (state) => {
      state.isLoading = true;
    },
    [postComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMess = null;
    },
    [postComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMess = action.error ? action.error.message : "Fetch failed";
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
export const { addComment } = commentsSlice.actions;
