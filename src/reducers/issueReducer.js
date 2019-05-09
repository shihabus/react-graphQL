import {
    LOADING,
    ERROR,
    SUCCESS
} from '../constants/type'


const INITIAL_STATE = {
    total_count: 0,
    count_since_yesterday: 0,
    count_since_sevendays: 0,
    count_prior_sevendays: 0,
    error: false,
    loading: false,
    fetched:false,
    owner:'',
    name:''
}

export default function IssueReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case LOADING: return { ...state, error: false, loading: true, fetched:false };
        case ERROR: return { ...state, INITIAL_STATE,error:true,loading:false };

        case SUCCESS:
            const {
                total_count,
                count_since_yesterday,
                count_since_sevendays,
                count_prior_sevendays,
                owner,
                name
            }=action.payload
            return {
                ...state,
                error: false,
                loading: false,
                fetched: true,
                total_count,
                count_since_yesterday,
                count_since_sevendays,
                count_prior_sevendays,
                owner,
                name
            };

        default: return state
    }
} 