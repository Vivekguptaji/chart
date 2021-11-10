import { Card, Col, Row ,Container} from "react-bootstrap";
import LineChart from "../Charts/LineChart";
import Config from "../../Utility/Config";
let omsDataObj = { 
    storyPoint: {},
    defects: [],
    avgSP: [],
    linear:[]
}
function Dashboard(props) { 
    let configData = Config; 
   
    return <>
        <Card border="dark" style={{ margin: '0.5rem' }}>
            <Card.Header>IBM Delivery Metrics</Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        {/* <Col><LineChart data={ data} chartName='IBM AEM'></LineChart></Col> */}
                        <Col><LineChart  data={omsDataObj} chartName='IBM OMS'></LineChart></Col>
                    </Row>
                    <Row>
                        {/* <Col><LineChart chartName='IBM Fullstack'></LineChart></Col> */}
                        {/* <Col><LineChart chartName='IBM Frontend'></LineChart></Col> */}
                    </Row>
                </Container>
            </Card.Body>
        </Card>
        {/* <Card border="dark" style={{ margin: '0.5rem' }}>
            <Card.Header>Overall Team Delivery Metrics</Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        <Col><LineChart chartName='Total AEM'></LineChart></Col>
                        <Col><LineChart chartName='Total OMS'></LineChart></Col>
                    </Row>
                    <Row>
                        <Col><LineChart chartName='Total Fullstack'></LineChart></Col>
                        <Col><LineChart chartName='Total Frontend'></LineChart></Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card> */}
    </>
}
export default Dashboard;