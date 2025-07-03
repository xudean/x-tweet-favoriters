import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

// @ts-ignore
function JsonViewer({data}) {
    return (
        <JSONPretty id="json-pretty" data={data}></JSONPretty>
    );
}

export default JsonViewer;