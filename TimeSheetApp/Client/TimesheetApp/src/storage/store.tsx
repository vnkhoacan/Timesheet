import { createStore } from "redux";
import { reducer } from "./reducer";

// Create store
export const store = createStore(reducer);
