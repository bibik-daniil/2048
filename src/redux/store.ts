import { configureStore } from "@reduxjs/toolkit";
import { cell } from "../models/cellRows";
import containerReduser from "./containerSlice";
import scoreReducer from "./scoreSlice"
import squareReduser from "./squareSlice"
import gameOverReduser from "./gameOverSlice";

const store = configureStore({
    reducer: {
        score: scoreReducer,
        square: squareReduser,
        container: containerReduser,
        gameOver: gameOverReduser 
    }
})

export interface RootState {
  score: {score: number; increase: number},
  square: {rows: number; cols: number},
  container: cell[],
  gameOver: boolean
}

export default store