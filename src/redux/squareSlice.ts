import { createSlice } from "@reduxjs/toolkit";

export interface stateSquare {
    rows: number;
    cols: number
}

const initialState: stateSquare = {
    rows: 4,
    cols: 4
}

const squareSlice = createSlice({
    name: 'square',
    initialState,
    reducers: {
        getSquare: (state, action) => {
            return action.payload
        }
    }
})

export const {getSquare} = squareSlice.actions

export default squareSlice.reducer