import { CHANGE_TO_DARK, CHANGE_TO_LIGHT } from "../actions/themeAction";


// Initial state
const initialState = {
    theme: 'Light' // Default theme
};

// Reducer function
export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_TO_LIGHT:
            return {...state, theme: 'Light'};
        case CHANGE_TO_DARK:
            return {
                ...state,
                theme: 'Dark' 
            };

        default:
            return state; 
    }
};
