import { createSlice } from "@reduxjs/toolkit"

const initialState: boolean = false

export const gameOverSlice = createSlice({
    name: 'gameOver',
    initialState,
    reducers: {
        setGameOver: (state, action) => {
            return action.payload
        }
    }
})

export const {setGameOver} = gameOverSlice.actions

export default gameOverSlice.reducer