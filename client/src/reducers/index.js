import { combineReducers } from "redux";

import posts from './posts';
import sign from './sign';

export const reducers = combineReducers({ posts , sign});