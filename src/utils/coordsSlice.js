import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState ={
    latitude:null,
    longitude:null,
    searchedCity:'',
    status:false,
    error:null,
};

export const fetchCoords = createAsyncThunk(
    "city/coordsFetch", async (city) => {
        try {
          const apiKey = "5464a5515fb8e6f8b19a6fc8c56db398";
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      
          const response = await fetch(url);
      
          if (!response.ok) {
            // Handle the error response here if necessary
            throw new Error("Network response was not ok");
          }
      
          const data = await response.json();
         
          return data;
        } catch (error) {
          // Handle any other errors that may occur during the fetch
          throw new Error("Error fetching data");
        }
      }
)
const coordsSlice = createSlice({
    name: "coords",
    initialState,
    
    reducers: {
      setLongitude: (state, action) => {
        state.longitude = action.payload;
      },
      setLatitude: (state, action) => {
        state.latitude = action.payload;
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCoords.pending, (state) => {
            state.status = true;
          })
          .addCase(fetchCoords.fulfilled, (state, action) => {
            state.status = false;
            state.latitude = action.payload?.coord?.lat;
            state.longitude = action.payload?.coord?.lon;
            state.searchedCity = action.payload?.name;
          })
          .addCase(fetchCoords.rejected, (state) => {
            state.status = false;
            state.error = "Can't fetch the coords";
          });
      },
});

export const { setLongitude, setLatitude } = coordsSlice.actions;
export default coordsSlice.reducer;