import { withTranslation } from '@i18n'
import { FiExternalLink } from 'react-icons/fi'
import CodeBox from '../../../../components/common/code-box/CodeBox'
import style from './export-result.module.scss'
import { COOP_URL } from '../../../../constants/constants'

interface ExportResultProps {
    data: string
    t: any
}

const ExportResult: React.FC<ExportResultProps> = ({ data, t }) => {
    return (
        <>
            <h5 className={style.title}>{t('test:result_page.your_encrypted_result')}:</h5>
            <div className={style.result}>
                <CodeBox content={data} />
            </div>

            <div className={style.bottom}>
                <a
                    href={`${COOP_URL}/pair?encdata=${encodeURIComponent(data)}`}
                    className={style.link}
                    target="_blank"
                    rel="noopener noreferrer">
                    <FiExternalLink />
                    {t('test:result_page.go_to_comparison')}
                </a>
            </div>
        </>
    )
}

export default withTranslation('test')(ExportResult)
