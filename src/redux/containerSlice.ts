import { createSlice } from "@reduxjs/toolkit";
import { cell } from "../models/cellRows";

const initialState: cell[] = []

const containerSlice = createSlice({
    name: 'container',
    initialState,
    reducers: {
        setContainer: (state, action) => {
            return action.payload
        }

    }
})

export const {setContainer} = containerSlice.actions

export default containerSlice.reducer