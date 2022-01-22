import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { withTranslation } from '@i18n'
import { GrInfo } from 'react-icons/gr'
import { baseTestResultType, DecodedDataType } from 'psychology/build/main/types/types'
import Questions from './questions/Questions'
import style from './test.module.scss'
import { savePersonalInfo, saveTestData, sendTestData } from '../../../actions/actionCreator'
import { TEST_THRESHOLD } from '../../../constants/constants'
import { encodeDataForURL, isBrowser, isTestPassed } from '../../../helper/helper'
import { globalStoreType } from '../../../typings/types'

const personalInfo = [0, 0, 0]

interface IDataState {
    personalInfo: readonly number[] | null
    testData: baseTestResultType | null
}

const Test = ({ t }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector((state: globalStoreType) => state.user)
    const [data, setData] = useState<IDataState>({
        personalInfo: null,
        testData: null
    })

    useEffect(() => {
        if (data.personalInfo && data.testData) {
            sendAnswers([data.personalInfo, data.testData])
        }
    }, [data.personalInfo, data.testData])

    return (
        <div className="visible">
            <div className={style.info}>
                <GrInfo />
                <div dangerouslySetInnerHTML={{ __html: t('test:page.test_block_desc') }} />
            </div>
            <Questions changeBlock={null} questionsSubmit={testSubmit} />
        </div>
    )

    function testSubmit(answers: baseTestResultType): void {
        setData({ personalInfo, testData: answers })
    }

    function sendAnswers(fullResult: DecodedDataType) {
        const isPassed = isTestPassed(fullResult[1], TEST_THRESHOLD)
        if (isPassed) {
            dispatch(savePersonalInfo(fullResult[0]))
            dispatch(saveTestData(fullResult[1]))
        }
        if (isLoggedIn && isPassed) {
            dispatch(sendTestData())
        }
        if (isBrowser) {
            router.push(`result?encdata=${encodeDataForURL(fullResult)}`)
        }
    }
}

export default withTranslation('test')(Test)
