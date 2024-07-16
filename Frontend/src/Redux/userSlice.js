import {createSlice,} from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    isLoading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
})

export const {signInSuccess , setIsLoading} = userSlice.actions;
export default userSlice.reducer;