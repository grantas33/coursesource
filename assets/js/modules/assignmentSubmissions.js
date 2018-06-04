import axios from "axios";
import tokenObject from "../tokenObject";

export const FETCH_ASSIGNMENT_SUBMISSION_STARTED =
    "assignments/FETCH_ASSIGNMENT_SUBMISSION_STARTED";
export const FETCH_ASSIGNMENT_SUBMISSION_ERROR = "assignments/FETCH_ASSIGNMENT_SUBMISSION_ERROR";
export const FETCH_ASSIGNMENT_SUBMISSION_RECEIVED =
    "assignments/FETCH_ASSIGNMENT_SUBMISSION_RECEIVED";

export const CREATE_ASSIGNMENT_SUBMISSION_STARTED =
    "assignments/CREATE_ASSIGNMENT_SUBMISSION_STARTED";
export const CREATE_ASSIGNMENT_SUBMISSION_ERROR = "assignments/CREATE_ASSIGNMENT_SUBMISSION_ERROR";
export const CREATE_ASSIGNMENT_SUBMISSION_RECEIVED =
    "assignments/CREATE_ASSIGNMENT_SUBMISSION_RECEIVED";

axios.defaults.baseURL = "/";

const initialState = {
    item: '',
    loading: true,
    error: false,
    updateLoading: true,
    updateResponse: '',
    updateError: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ASSIGNMENT_SUBMISSION_STARTED:
            return {
                ...state,
                loading: true,
                error: false
            };
        case FETCH_ASSIGNMENT_SUBMISSION_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };
        case FETCH_ASSIGNMENT_SUBMISSION_RECEIVED:
            return {
                ...state,
                item: action.payload,
                loading: false,
                error: false
            };
        case CREATE_ASSIGNMENT_SUBMISSION_STARTED:
            return {
                ...state,
                updateLoading: true
            };
        case CREATE_ASSIGNMENT_SUBMISSION_ERROR:
            return {
                ...state,
                updateLoading: false,
                updateResponse: action.payload,
                updateError: true
            };
        case CREATE_ASSIGNMENT_SUBMISSION_RECEIVED:
            return {
                ...state,
                updateLoading: false,
                updateResponse: action.payload,
                updateError: false
            };
        default:
            return state;
    }
};

export const fetchAssignmentSubmission = assignmentId => dispatch => {
    dispatch({
        type: FETCH_ASSIGNMENT_SUBMISSION_STARTED
    });
    axios
        .get('api/assignments/' + assignmentId + '/submission',
            tokenObject())
        .then(res => {
            dispatch({
                type: FETCH_ASSIGNMENT_SUBMISSION_RECEIVED,
                payload: res.data
            });
        })
        .catch(err => {
            if (err.response.data.message === "Invalid Token") {
                dispatch(push("/login"));
                window.localStorage.removeItem("userToken");
            }
            dispatch({
                type: FETCH_ASSIGNMENT_SUBMISSION_ERROR
            });
        });
};

export const createAssignmentSubmission = (assignmentId, submission) => dispatch => {
    dispatch({
        type: CREATE_ASSIGNMENT_SUBMISSION_STARTED
    });
    axios
        .put("api/assignments/" + assignmentId + "/submission", submission, tokenObject())
        .then(res => {
            dispatch({
                type: CREATE_ASSIGNMENT_SUBMISSION_RECEIVED,
                payload: res.data
            });
        })
        .catch(err => {
            if (err.response.data.message === "Invalid Token") {
                dispatch(push("/login"));
                window.localStorage.removeItem("userToken");
            }
            dispatch({
                type: CREATE_ASSIGNMENT_SUBMISSION_ERROR,
                payload: err.data
            });
        });
}
