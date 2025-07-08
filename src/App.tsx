import {useState} from 'react';
import './App.css';
import {primusProofTest, verifyAndClaimToken} from './script/primus';
import {Input, Button, Card, Typography,message} from 'antd';
import JsonViewer from "./component/JsonViewer.tsx";
import type {NoticeType} from "antd/es/message/interface";

const {Title, Text} = Typography;

function App() {
    const [attestation, setAttestation] = useState('');
    const [favoriter, setChannelLogin] = useState('goose_eggsss');
    const [messageApi, contextHolder] = message.useMessage();


    const messagefn = (type: NoticeType,message: string) => {
        messageApi.open({
            type: type,
            content: message,
        });
    };


    const [launchPage, setLaunchPage] = useState(
        'https://x.com/goose_eggsss/status/1940597194823975242/likes'
    );
    const [isLoading, setIsLoading] = useState(false);

    const [isVerifying, setIsVerifying] = useState(false);

    const startAttFn = async () => {
        setIsLoading(true);
        setAttestation('');
        if (!favoriter) {
            alert("You must input a favoriter name");
            setIsLoading(false);
            return;
        }
        try {
            await primusProofTest(launchPage, favoriter, (attestation) => {
                setAttestation(JSON.stringify(attestation));
                setIsLoading(false);
            });
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
        setIsLoading(false)
    };

    const submitAttestation = async () => {
        try {
            await verifyAndClaimToken(JSON.parse(attestation));
            messagefn("success", "Verify failed");
        } catch (err) {
            console.log(err)
            messagefn("error", "Verify failed");
        } finally {
            setIsVerifying(false);
        }
    }

    return (
        <div className="app-container">
            {contextHolder}
            <div className="centered-content">
                <Title level={2} className="app-title">Primus Demo</Title>

                <Card className="input-card" hoverable>
                    <div className="input-group">
                        <Text strong>Launch Page:</Text>
                        <Input
                            value={launchPage}
                            onChange={(e) => setLaunchPage(e.target.value)}
                            placeholder="Enter launch page URL"
                            className="custom-input"
                        />
                    </div>

                    <div className="input-group">
                        <Text strong>Enter the screen_name to check:</Text>
                        <Input
                            value={favoriter}
                            onChange={(e) => setChannelLogin(e.target.value)}
                            placeholder="Enter favoriter name"
                            className="custom-input"
                        />
                    </div>

                    <Button
                        type="primary"
                        onClick={startAttFn}
                        block
                        loading={isLoading}
                        className="submit-button"
                    >
                        Start Attestation
                    </Button>
                </Card>

                {
                    attestation && (<Button onClick={submitAttestation} loading={isVerifying} className="submit-button"
                    >Verify And Claim</Button>)
                }
                {attestation && (
                    <Card className="result-card">
                        <Title level={4} style={{textAlign: 'center'}}>Attestation Result:</Title>
                        <div className="result-content">
                            {attestation && <JsonViewer data={attestation}/>}
                        </div>
                    </Card>
                )}

            </div>

        </div>
    );
}

export default App;