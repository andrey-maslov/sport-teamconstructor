import Head from 'next/head'
import { withTranslation } from '@i18n'
import Layout from '../../../components/layout/Layout'
import Result from './Result'
import { SITE_TITLE } from '../../../constants/constants'

const TestResultLayout: React.FC<{ t: any }> = ({ t }) => {
    return (
        <>
            <Head>
                <title>{`${t('test:page.title')} - ${SITE_TITLE}`}</title>
            </Head>
            <div className="page-test-result">
                <Layout>
                    <section className="pt-lg pb-lg">
                        <div className="container">
                            <Result />
                        </div>
                    </section>
                </Layout>
            </div>
        </>
    )
}

export default withTranslation('test')(TestResultLayout)
