import { useState } from 'react';
import './App.css';
import { primusProofTest } from './script/primus';
import { Input, Button, Card, Typography } from 'antd';
import JsonViewer from "./component/JsonViewer.tsx";

const { Title, Text } = Typography;

function App() {
    const [attestation, setAttestation] = useState('');
    const [favoriter, setChannelLogin] = useState('goose_eggsss');
    const [launchPage, setLaunchPage] = useState(
        'https://x.com/goose_eggsss/status/1940597194823975242/likes'
    );
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <div className="app-container">
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
                        <Text strong>Favoriter You Want to Check:</Text>
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