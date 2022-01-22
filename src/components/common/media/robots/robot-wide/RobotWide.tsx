import React from 'react';
import style from './robot-wide.module.scss';

const RobotWide = () => {

    return (
        <div className={style.robot}>
            <div className={`${style.arm} ${style.leftArm}`}>
                <div className={style.shoulder}/>
                <div className={style.handWrap}>
                    <div className={style.cubit}/>
                    <div className={style.hand}/>
                </div>
            </div>
            <div className={style.center}>
                <div className={style.top}>
                    <div className={style.antenna}>
                        <div className={`${style.apex} antenna-anim`}/>
                        <div className={style.vertical}/>
                        <div className={`${style.curls} antenna-anim`}>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                    </div>
                </div>
                <div className={style.head}>
                    <div className={style.pic}>
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                        <div/>
                    </div>
                    <div className={style.leftPart}/>
                    <div className={style.rightPart}/>
                    <div className={style.eyes}>
                        <div className={style.eye}/>
                        <div className={style.eye}/>
                    </div>
                    <div className={style.mouth}/>
                </div>
                <div className={style.bottom}>
                    <div className={style.body}/>
                    <div className={style.legs}>
                        <div className={style.leg}>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                        <div className={style.leg}>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${style.arm} ${style.rightArm}`}>
                <div className={style.shoulder}/>
                <div className={style.handWrap}>
                    <div className={style.cubit}/>
                    <div className={style.hand}/>
                </div>
            </div>
        </div>
    );
}

export default RobotWide;