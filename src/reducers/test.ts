import {
    SAVE_TEST_DATA,
    SAVE_PERSONAL_INFO,
    FETCH_TERMS,
    FETCH_TEST_DESC,
    CLEAR_TEST_DATA
} from '../actions/actionTypes'

const STATE = {
    personalInfo: null,
    testData: null,
    terms: null,
    descriptions: null
}

export type testStoreType = {
    personalInfo: [] | null
    testData: [] | null
    terms: Record<string, any> | null
    descriptions: any | null
}

export const test = (state = STATE, { type, personalInfo, testData, terms, descriptions }) => {
    switch (type) {
        case SAVE_PERSONAL_INFO:
            return {
                ...state,
                personalInfo
            }
        case SAVE_TEST_DATA:
            return {
                ...state,
                testData
            }
        case FETCH_TERMS:
            return {
                ...state,
                test,
                terms
            }
        case FETCH_TEST_DESC:
            return {
                ...state,
                descriptions
            }
        case CLEAR_TEST_DATA:
            return {
                ...state,
                personalInfo: null,
                testData: null
            }
        default:
            return state
    }
}
