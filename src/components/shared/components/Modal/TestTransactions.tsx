import React from "react";
import {Button, Col, Row} from 'antd';
import {LoadingOutlined} from '@ant-design/icons/lib';
import cs from 'classnames';
import {
    PieChart, Pie, Cell,
} from 'recharts';

import s from '../../../App/app.module.css';
import iconArrowStartTransactions from '../../assets/icon-start-transactions.svg';

const data = [
    { name: 'Group A', value: 300 },
];
const COLORS = ['#0071F6', '#0071F6', '#0071F6', '#0071F6'];

export function TestTransactions() {
    const [seconds, setSeconds] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [start, setStart] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        let timer: any;
        let timerMin: any;
        if (seconds < 59 && start) {
            timer = setInterval(() => setSeconds(seconds + 1), 1000);
        } else if (start) {
            timerMin = setInterval(() => setMinutes(minutes + 1), 1000);
            timer = setInterval(() => setSeconds(0), 1000);
        }
        return () => {
            clearInterval(timer);
            clearInterval(timerMin)
        };
    }, [seconds, minutes, start]);

    const startTransactions = () => {
        setStart(true);
        setLoading(true);
    }

    return <Col style={{width: '368px'}} className={cs([s.modalFakePostContainer, s.modalFakePostTitleWrapper])}>
        <Row className={cs([s.testTransactionsTextTitle])}>
            Test the scalability of transactions
        </Row>
        <Row className={cs([s.testTransactionsGraph])}>
            <PieChart width={800} height={400}>
                <Pie
                    data={data}
                    cx={420}
                    cy={200}
                    startAngle={180}
                    endAngle={40}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
            </PieChart>
        </Row>
        <Row style={{opacity: 0.4, paddingTop: '80px'}}>
            {minutes < 10 ? '0' + minutes : minutes} : {seconds < 10 ? '0' + seconds : seconds}
        </Row>
        <Row className={cs([s.testTransactionsNumberText])}>
            5677
        </Row>
        <Row className={cs([s.testTransactionsText])}>
            Transactions
        </Row>
        <div className={cs([s.testTransactionsButtonWrapper])}>
            <Row>
                <Button type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        style={{height: '40px', backgroundColor: loading ? 'white' : '#147EFF'}}
                        onClick={() => startTransactions()}
                >
                    {loading ? <LoadingOutlined style={{color: '#0071F6'}} /> : <div>Start test <img src={iconArrowStartTransactions} alt={'arrow-star-submit'}
                                                                          className={'p-l-8 p-b-4'}/></div>}
                </Button>
            </Row>
        </div>
    </Col>
}
