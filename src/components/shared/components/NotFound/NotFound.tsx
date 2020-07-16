import React from 'react';
import Lottie from 'react-lottie';
import {Link} from 'react-router-dom';
import {LeftOutlined} from '@ant-design/icons';
import {Button} from 'antd';

import * as animationData from './404.lottie.json';

export function NotFound() {

    // @ts-ignore
    const defaultAnimationData = animationData.default;

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: defaultAnimationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return <div>
        <h1 className={'text-center m-b-20'}>PAGE NOT FOUND</h1>
        <Lottie options={defaultOptions}
            height={200}
            width={280}
            isStopped={false}
            isPaused={false}
    />
    <Link to={'/'} className={'flex flex-center m-t-30'}>
        <Button>
            <LeftOutlined />
            Go back home
        </Button>
    </Link>
    </div>;
}
