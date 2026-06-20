import { createSlice } from "@reduxjs/toolkit"

const initialState: boolean = false

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettings: (state) => {
            return !state
        }
    }
})

export const {setSettings} = settingsSlice.actions

export default settingsSlice.reducer