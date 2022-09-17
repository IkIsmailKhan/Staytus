import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import swapi from '../../api/swapi';

export const fetchPlanets = createAsyncThunk('fetchPlanets', async (params, { rejectWithValue }) => {
    let planets = [];
    return swapi("/planets")
        .then(response => {
            planets = response.data.results;
            return response.data.count;
        })
        .then(count => {
            const numberOfPagesLeft = Math.ceil((count - 1) / 10);
            let promises = [];

            for (let i = 2; i <= numberOfPagesLeft; i++) {
                promises.push(swapi(`/planets?page=${i}`));
            }
            return Promise.all(promises);
        })
        .then(response => {
            planets = response.reduce((acc, data) => [...acc, ...data.data.results], planets);
            const filteredPlanets = planets.filter((obj) => obj.films.length !== 0 && obj.residents.length !== 0)
            console.log('filteredPlanets: ', filteredPlanets)

            return filteredPlanets;
        })
        // .then(planets => {
        //     let species = [];
        //     return swapi("/species")
        //         .then(response => {
        //             species = response.data.results;
        //             return response.data.count;
        //         })
        //         .then(count => {
        //             const numberOfPagesLeft = Math.ceil((count - 1) / 10);
        //             let promises = [];

        //             for (let i = 2; i <= numberOfPagesLeft; i++) {
        //                 promises.push(swapi(`/species?page=${i}`));
        //             }
        //             return Promise.all(promises);
        //         })
        //         .then(response => {
        //             species = response.reduce((acc, data) => [...acc, ...data.data.results], species);
        //             const filteredSpecies = species.filter((obj) => obj.classification == 'reptile' && obj.people.length !== 0)

        //             console.log('filteredSpecies: ', filteredSpecies)
        //             // species = filteredSpecies;
        //             return filteredSpecies

        //         })
        //         .catch(error => console.log("Properly handle your exception here"));
        // })
        .catch(error => console.log("Properly handle your exception here"));
})



export const appAuthSlice = createSlice({
    name: 'planets',
    initialState: {
        list: [],
        loading: false,
        error: ''
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPlanets.fulfilled, (state, action) => {
            state.list = action.payload
            state.loading = false
            state.error = ""
        })
        builder.addCase(fetchPlanets.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(fetchPlanets.rejected, (state, action) => {
            state.list = []
            state.loading = false
            state.error = action.payload
        })
    }
})

export default appAuthSlice.reducer
