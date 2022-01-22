import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { useMediaPredicate } from 'react-media-hook'
import { FiCheckCircle, FiHome, FiSettings } from 'react-icons/fi'
import { withTranslation } from '@i18n'
import { useDeviceDetect } from '../../../helper/useDeviceDetect'
import { checkAuth, getCurrencyRates } from '../../../actions/actionCreator'
import { globalStoreType } from '../../../typings/types'
import { REDIRECT_URL } from '../../../actions/actionTypes'
import style from './header.module.scss'
import LangSwitcher from '../../common/buttons/lang-switcher/LangSwitcher'
import TopLogo from './top-logo/TopLogo'
import { encodeDataForURL } from '../../../helper/helper'

const Header = ({ t }) => {
    const { isLoggedIn, email } = useSelector((state: globalStoreType) => state.user)
    const { testData, personalInfo } = useSelector((state: globalStoreType) => state.test)
    const dispatch = useDispatch()
    const smallDevice = useMediaPredicate('(max-width: 992px)')
    const { isMobile } = useDeviceDetect()
    const router = useRouter()
    const currentRoute = router.pathname
    const [testLink, setTestLink] = useState('/test')

    useEffect(() => {
        dispatch(getCurrencyRates())
        if (!isLoggedIn) {
            dispatch(checkAuth())
        }
    }, [dispatch, isLoggedIn, isMobile, smallDevice])

    useEffect(() => {
        const isUnwantedPage = Boolean(currentRoute.match(/(signin)|(registration)|(404)/))
        if (!isUnwantedPage) {
            const route = currentRoute !== '/test/result' ? currentRoute : '/test'
            dispatch({ type: REDIRECT_URL, redirectUrl: route })
        }
    }, [currentRoute, dispatch])

    useEffect(() => {
        if (testData && personalInfo) {
            setTestLink(`/test/result?encdata=${encodeDataForURL([personalInfo, testData])}`)
        }
    }, [testData])

    const navLinks = [
        { title: t('common:nav.home'), path: '/', icon: <FiHome /> },
        {
            title: t('common:nav.test'),
            path: testLink,
            icon: <FiCheckCircle />
        }
    ]
    const privateLinks = [{ title: 'Account settings', path: '/profile', icon: <FiSettings /> }]
    const allLinks = isLoggedIn ? [...navLinks, ...privateLinks] : navLinks

    return (
        <header className={style.header}>
            <div className={style.bar}>
                <TopLogo />
                <LangSwitcher />
            </div>
        </header>
    )
}

export default withTranslation('common')(Header)
