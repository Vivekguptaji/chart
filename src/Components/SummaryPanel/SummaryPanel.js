import { Container, Row, Col } from "react-bootstrap"; 
import Select from 'react-select'
function SummaryPanel(props) {
    let data = props.data;
    const handleChange = (value) => {
        props.onStatusFiledChange(value, props.data)
    }
 
    let multiSelectArray = [];
    for (const key in data.statusLookup) {
        multiSelectArray.push({ value: key, label: key })
    } 
    let storyPoints = Object.keys(data.storyPoint).length >0 ? Object.values(data.storyPoint).reduce((a, b) => a + b) : 0;
    return <Container className="summaryContainer">
        <Row>
            <Col className="summaryContainer_title">Summary of {data.name}</Col>
        </Row>
        <Row>
            <Col>Total Row Processed: {data.loadedData.length}</Col>
            <Col>Total Story Points: {storyPoints}</Col>
        </Row>
        <Row>
            <div>Report Status:</div>
            <Select
                options={multiSelectArray}
                onChange={handleChange}
                isMulti={true}
                closeMenuOnSelect={true}
                defaultValue={multiSelectArray}
            />
        </Row>
    </Container>
}

export default SummaryPanel;