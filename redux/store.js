import { createStore } from "@reduxjs/toolkit";
import appReducer from "./reducer";

const store = createStore(appReducer);
export default store;
