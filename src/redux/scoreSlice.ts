import { createSlice } from "@reduxjs/toolkit";

interface scoreState {
    score: number;
    increase: number
}

const initialState: scoreState = {
    score: 0,
    increase: 0,
}

const scoreSlice =  createSlice({
    name: 'score',
    initialState,
    reducers: {
        getNewScore: (state, action) => {
            return {...state, score: state.score + action.payload, increase: action.payload}
        },
        resetScore: (state) => {
            return initialState
        }
    }
})

export const {getNewScore, resetScore} = scoreSlice.actions

export default scoreSlice.reducer