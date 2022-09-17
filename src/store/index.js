// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import planets from './planets/index';

export const store = configureStore({
    reducer: {
        planets
    }
})
