import { combineReducers } from 'redux';
import { ordersReducers } from "./ordersReducer";
import {languagesReducers} from "./languagesReducer";
import {levelsReducers} from "./levelsReducer";
import {pagesReducers} from "./pagesReducer";
import {servicesReducers} from "./servicesReducer";
import {sourcesReducers} from "./sourcesReducer";
import {spacingReducers} from "./spacingReducer";
import {stylesReducers} from "./stylesReducer";
import {subjectsReducers} from "./subjectReducer";
import {typesReducers} from "./typesReducer";
import {urgenciesReducers} from "./urgencyReducer";


const rootReducer = combineReducers({
    orderState: ordersReducers,
    languageState: languagesReducers,
    levelState: levelsReducers,
    pageState: pagesReducers,
    serviceState: servicesReducers,
    sourceState: sourcesReducers,
    spacingState: spacingReducers,
    styleState: stylesReducers,
    subjectState: subjectsReducers,
    typeState: typesReducers,
    urgencyState: urgenciesReducers
});

export default rootReducer;
