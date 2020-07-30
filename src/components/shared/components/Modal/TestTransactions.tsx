import React from "react";
import {Button, Col, Row} from 'antd';
import {LoadingOutlined} from '@ant-design/icons/lib';
import cs from 'classnames';
import {
    PieChart, Pie, Cell,
} from 'recharts';

import s from '../../../App/app.module.css';
import iconArrowStartTransactions from '../../assets/icon-start-transactions.svg';
import iconGraphBlank from '../../assets/icon-graph-blank.svg';
import {useAuth} from '../../../pages/Main/Homepage/Auth.context';
import {useFetch} from '../../hooks/useFetch';
import {getBackendEndpoint} from '../../utilities/api';
import {config} from '../../../../config';

const data = [
    { name: 'Group A', value: 300 },
];
const COLORS = ['#0071F6', '#0071F6', '#0071F6', '#0071F6'];

export function TestTransactions() {
    const authCtx = useAuth();

    const { get } = useFetch({
        path: getBackendEndpoint('/start_benchmark'),
        load: false,
        modal: true
    });

    const { get: getProgress } = useFetch({
        path: getBackendEndpoint('/get_benchmark_progress'),
        load: false,
        modal: true
    });

    const [seconds, setSeconds] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [graph, setGraph] = React.useState(180);
    const [txs, setTxs] = React.useState(0);
    const [start, setStart] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showResults, setShowResults] = React.useState(false);
    const [results, setResults] = React.useState({averageGasBurnt: 0, averageTxFee: 0});

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
            clearInterval(timerMin);
        };
    }, [seconds, minutes, start]);

    React.useEffect(() => {
        let setter: any;

        if (start && graph > 0) {
            setter = setInterval(async () => {
                let progress: any;
                progress = await getProgress().catch((error) => console.log(error))
                setGraph( 180 - (progress.data.progress * 180))
                setTxs(config.testTransactionNumber * progress.data.progress)
            }, 3000);
        } else {
            getProgress().then((response) => {
                if (start) {
                    setResults({averageGasBurnt: response.data.averageGasBurnt, averageTxFee: response.data.averageTxFee})
                    setShowResults(true);
                    authCtx.setShowResponse(true, '', response.data.contract);
                    console.log(response.data)
                }
            }).catch((error) => console.log(error));

            setStart(false);
            setLoading(false);
        }

        return () => {
            clearInterval(setter);
        };
    }, [start, graph, txs]);



    const startTransactions = async () => {
        setSeconds(0);
        setMinutes(0);
        setStart(true);
        setShowResults(false);
        setLoading(true);
        setGraph(180);
        setTxs(0);

        await get();
    }

    return <Col style={{width: '368px'}} className={cs([s.modalFakePostContainer, s.modalFakePostTitleWrapper])}>
        <Row className={cs([s.testTransactionsTextTitle])}>
            Test the scalability of transactions
        </Row>
        <Row className={cs([s.testTransactionsGraph])}>
            <img src={iconGraphBlank} alt={'icon-blank'} style={{position: 'absolute', top: '175px', left: '105px'}}/>
            <PieChart width={800} height={400}>
                <Pie
                    data={data}
                    cx={420}
                    cy={200}
                    startAngle={180}
                    endAngle={graph}
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
            {txs}
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
        {showResults && <div>
            <Row className={cs([s.testTransactionsGasText])}>
                Average Gas Burnt: {results.averageGasBurnt}
            </Row>
            <Row className={cs([s.testTransactionsFeeText])}>
                Average Tx Fee: {results.averageTxFee}
            </Row>
        </div>}
    </Col>
}
