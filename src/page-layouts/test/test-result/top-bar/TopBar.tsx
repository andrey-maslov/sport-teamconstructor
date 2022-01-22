import { withTranslation } from '@i18n'
import style from './top-bar.module.scss'
import PopoverMore from '../popover-more/PopoverMore'
import PopoverExport from '../popover-export/PopoverExport'

interface TopBarProps {
    title: string
    userResult: [string, number][]
    details: string[]
    fullTestResult: any
}

const TopBar: React.FC<TopBarProps> = ({ title, userResult, details, fullTestResult }) => {
    return (
        <div className={style.top}>
            <h4 className={style.title}>{title}</h4>
            <PopoverMore userResult={userResult} details={details} />
            {/* <PopoverExport fullResult={fullTestResult} /> */}
        </div>
    )
}

export default withTranslation('test')(TopBar)
