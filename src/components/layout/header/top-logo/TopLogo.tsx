import { Link } from '@i18n'
import style from './top-logo.module.scss'

export default function TopLogo() {
    return (
        <div className={style.logo}>
            <Link href="/">
                <a>
                    {/* <img src="/img/logo.svg" alt="results" /> */}
                    <span>
                        Test for <b>EPAM</b>ers
                    </span>
                </a>
            </Link>
        </div>
    )
}
