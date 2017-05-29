import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface PatternDataState {
    patterns: Pattern[];
    isReceivingPatterns: Boolean;
}

export interface Pattern {
    patternName: string;
    shortName: string;
}

interface RequestPatternsAction {
    type: 'REQUEST_PATTERNS';
}

interface ReceivePatternsAction {
    type: 'RECEIVE_PATTERNS';
    patterns: Pattern[];
}

type KnownAction = RequestPatternsAction | ReceivePatternsAction;

const actionRequestPatterns = (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    let fetchTask = fetch('/api/patterns')
        .then(response => response.json() as Promise<Pattern[]>)
        .then(data => {
            dispatch({ type: 'RECEIVE_PATTERNS', patterns: data });
        });

    addTask(fetchTask);
    dispatch({ type: 'REQUEST_PATTERNS'});
};

export const actionCreators = {
    actionRequestPatterns
};

const reduceRequestPatterns = (state: PatternDataState, action: KnownAction): PatternDataState => {
    return { isReceivingPatterns: true, ...state };
};

const reduceReceivePatterns = (state: PatternDataState, action: KnownAction): PatternDataState => {
    action = <ReceivePatternsAction> action;
    return { patterns: action.patterns, isReceivingPatterns: false };
};

const reducerMap = {
    'REQUEST_PATTERNS': reduceRequestPatterns,
    'RECEIVE_PATTERNS': reduceReceivePatterns
};

const initialState: PatternDataState = {
    patterns: [],
    isReceivingPatterns: false,
};

export const reducer: Reducer<PatternDataState> = (state: PatternDataState, action: KnownAction) => {
    console.log(action.type);
    const reducerFunc = reducerMap[action.type];
    if (typeof reducerFunc === "function") {
        return reducerFunc.call(this, state, action);
    } else {
        return state || initialState;
    }
};

