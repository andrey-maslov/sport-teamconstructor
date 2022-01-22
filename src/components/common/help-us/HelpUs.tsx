import React, { useState, useEffect, useRef } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useMediaPredicate } from 'react-media-hook'
import { useForm } from 'react-hook-form'
import { withTranslation } from '@i18n'
import axios from 'axios'
import ButtonClose from '../../../components/common/buttons/button-close/ButtonClose'
import style from './help-us.module.scss'

function HelpUs({ t }) {
    const containerRef = useRef(null)
    const [fixedClass, setFixedClass] = useState('')
    const [canBeFixed, setCanBeFixed] = useState(true)
    const { register, handleSubmit, errors, clearErrors, reset } = useForm<{ email: string }>()
    const [isSent, setSent] = useState(false)

    const onScroll = () => {
        if (containerRef.current) {
            if (containerRef.current.getBoundingClientRect().top < window.innerHeight) {
                setFixedClass('')
            } else {
                setFixedClass('fixed')
            }
        }
    }

    useEffect(() => {
        if (window && canBeFixed) {
            window.addEventListener('scroll', onScroll, true)
        }
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [canBeFixed])

    const closeFixedBlock = () => {
        window.removeEventListener('scroll', onScroll)
        setFixedClass('')
        setCanBeFixed(false)
    }

    const biggerThan992 = useMediaPredicate('(min-width: 992px)')

    if (isSent) {
        return (
            <div className={`${style.success}`}>
                <h2>Спасибо!</h2>
            </div>
        )
    }

    return (
        <div ref={containerRef} className={style.section}>
            <div>
                <div className={style.close}>
                    <ButtonClose handle={closeFixedBlock} />
                </div>
                <div className={`${style.wrapper}`}>
                    <div className={style.desc}>
                        <p>Оставьте свой email если хотите следить за новостями проекта</p>
                        <p>
                            <small>
                                Внедрение софта для анализа совместимости психологических профилей
                                для организаций с большим штатом. Контакт:{' '}
                                <a href="mailto:sergei@teamconstructor.com">
                                    sergei@teamconstructor.com
                                </a>
                            </small>
                        </p>
                    </div>
                    <form className={style.form} onSubmit={handleSubmit(saveEmail)}>
                        <div className={style.group}>
                            <input
                                name="email"
                                className={`${style.input} input`}
                                type="text"
                                aria-label="email"
                                placeholder="Ваш email"
                                ref={register({
                                    required: 'Заполните это поле',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: `Введите email в правильном формате`
                                    }
                                })}
                            />
                            <button className={`btn btn-accent ${style.btn}`}>
                                <FaArrowRight />
                            </button>
                        </div>
                        {errors.email && <div className={style.error}>{errors.email.message}</div>}
                    </form>
                </div>
            </div>
        </div>
    )

    function saveEmail(data) {
        const { email } = data

        axios
            .post(
                '/save-email',
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(() => {
                reset()
                setSent(true)
            })
    }
}

export default withTranslation('common')(HelpUs)
