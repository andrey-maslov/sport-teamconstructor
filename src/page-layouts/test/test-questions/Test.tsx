import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { withTranslation } from '@i18n'
import { GrInfo } from 'react-icons/gr'
import { baseTestResultType, DecodedDataType } from 'psychology/build/main/types/types'
import Questions from './questions/Questions'
import style from './test.module.scss'
import { CLEAR_TEST_DATA } from '../../../actions/actionTypes'
import {
    savePersonalInfo,
    saveTestData,
    sendTestData,
    saveUsersData
} from '../../../actions/actionCreator'
import { TEST_THRESHOLD } from '../../../constants/constants'
import { isTestPassed } from '../../../helper/helper'

const personalInfo = [0, 0, 0]

interface IDataState {
    personalInfo: readonly number[] | null
    testData: baseTestResultType | null
}

const Test = ({ t }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [data, setData] = useState<IDataState>({
        personalInfo: null,
        testData: null
    })
    const [teammate, setTeammate] = useState('')
    const [start, setStart] = useState(new Date().getTime())
    const [isTestDone, setTestDone] = useState(false)
    const [isNameError, setNameError] = useState(false)

    useEffect(() => {
        dispatch({ type: CLEAR_TEST_DATA })
    }, [])

    useEffect(() => {
        if (data.personalInfo && data.testData) {
            sendAnswers([data.personalInfo, data.testData])
        }
    }, [data.personalInfo, data.testData])

    if (isTestDone) {
        return <h3 style={{ textAlign: 'center' }}>{t('test:page.thanx')}</h3>
    }

    return (
        <div className="visible">
            <div className={style.info}>
                <GrInfo />
                <div dangerouslySetInnerHTML={{ __html: t('test:page.test_block_desc') }} />
            </div>
            <div className={`${style.name} ${isNameError ? style.error : ''}`}>
                <input
                    type="text"
                    name="teammate"
                    value={teammate}
                    placeholder={t('test:page.enter_name')}
                    aria-label="name"
                    onChange={e => {
                        setNameError(false)
                        setTeammate(e.target.value)
                    }}
                />
                {isNameError && <div className={style.nameError}>{t('test:page.name_error')}</div>}
            </div>
            <Questions changeBlock={null} questionsSubmit={testSubmit} />
        </div>
    )

    function testSubmit(answers: baseTestResultType): void {
        setData({ personalInfo, testData: answers })
    }

    function sendAnswers(fullResult: DecodedDataType) {
        const isPassed = isTestPassed(fullResult[1], TEST_THRESHOLD)
        if (!teammate) {
            setNameError(true)
            return
        }
        if (isPassed) {
            dispatch(savePersonalInfo(fullResult[0]))
            dispatch(saveTestData(fullResult[1]))

            // save to file
            dispatch(saveUsersData(start, teammate))
            // send data to server
            // need to reactor as promise and do redirect after getting OK from server
            dispatch(sendTestData())
            setTestDone(true)
        }
        // if (isBrowser) {
        //     router.push(`result?encdata=${encodeDataForURL(fullResult)}`)
        // }
    }
}

export default withTranslation('test')(Test)
