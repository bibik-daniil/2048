import { createSlice } from "@reduxjs/toolkit"

const initialState: boolean = false

export const gameOverSlice = createSlice({
    name: 'gameOver',
    initialState,
    reducers: {
        setGameOver: (state) => {
            return !state
        }
    }
})

export const {setGameOver} = gameOverSlice.actions

export default gameOverSlice.reducer