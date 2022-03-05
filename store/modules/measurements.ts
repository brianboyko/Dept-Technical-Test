import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalizeBy } from "../../utils/normalizeBy";

export interface Measurement {
  lastUpdated: string;
  parameter: string;
  unit: string;
  value: number;
}
export interface LocalMeasurement {
  location: string;
  city: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  country: "GB";
  measurements: Measurement[];
}
interface MeasurementState {
  data: Record<string, LocalMeasurement>;
  isLoading: boolean;
  errMsg: string;
}

const initialState: MeasurementState = {
  data: {},
  isLoading: false,
  errMsg: "",
};

export const measurementSlice = createSlice({
  name: "measurements",
  initialState,
  reducers: {
    // Redux toolkit uses immer under the hood so
    // we can just mutate the state parameter (really a draft),
    // and RJSTK automatically diffs and updates.
    addLocations: (
      state: MeasurementState,
      action: PayloadAction<LocalMeasurement[]>
    ) => {
      const normalized = normalizeBy(action.payload, "location");
      Object.assign(state.data, normalized);
    },
    removeLocation: (
      state: MeasurementState,
      action: PayloadAction<string>
    ) => {
      const locationToRemove = action.payload;
      delete state.data[locationToRemove];
    },
    setIsLoading: (state: MeasurementState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrMsg: (state: MeasurementState, action: PayloadAction<string>) => {
      state.errMsg = action.payload;
    },
    clearErrMsg: (state: MeasurementState) => {
      state.errMsg = "";
    },
  },
});

export const { addLocations, removeLocation, setIsLoading, setErrMsg, clearErrMsg } =
  measurementSlice.actions;

export const fetchLatestMeasurements = createAsyncThunk(
  "measurements/fetchLatestStatus",
  async (cityName: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    dispatch(setIsLoading(true));
    try {
      const latest = await fetch(
        `${window.location.origin}/api/latest?city=${cityName}`
      ).then((res) => res.json());
      dispatch(addLocations(latest.results));
      dispatch(clearErrMsg());
    } catch (err: any) {
      dispatch(setErrMsg(err.toString()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }
);

export default measurementSlice.reducer;
