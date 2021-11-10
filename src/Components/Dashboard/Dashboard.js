import { Card, Col, Row ,Container} from "react-bootstrap";
import LineChart from "../Charts/LineChart";
import Config from "../../Utility/Config";
 
const getStoryPoints = (values) => { 
    let storyPoints = [];
    values.forEach(element => {
        storyPoints.push(element.storyPoint)
    });
    return storyPoints
}
const getDefectsPoints = (values) => { 
    let defectsPoints = [];
    values.forEach(element => {
        defectsPoints.push(element.defects)
    });
    return defectsPoints
}
function Dashboard(props) {
    let configData = Config;
    let dashboardData = props.comingData[0]["dashboardChartData"];
    let omsData = dashboardData['oms'];
    let omsDataObj = {}
    if (omsData) {
        omsDataObj = {
            series: Object.keys(omsData),
            storyPoints: getStoryPoints(Object.values(omsData)),
            defectsPoints: getDefectsPoints(Object.values(omsData))
        }
    }
    let aemData = dashboardData['aem'];
    let aemDataObj = {}
    if (aemData) {
          aemDataObj = {
            series: Object.keys(omsData),
            storyPoints: getStoryPoints(Object.values(aemData)),
            defectsPoints: getDefectsPoints(Object.values(aemData))
        }
    }
    let uiData = dashboardData['ui'];
    let uiDataObj = {}
    if (uiData) {
          uiDataObj = {
            series: Object.keys(omsData),
            storyPoints: getStoryPoints(Object.values(uiData)),
            defectsPoints: getDefectsPoints(Object.values(uiData))
        }
    }
    return <>
        <Card border="dark" style={{ margin: '0.5rem' }}>
            <Card.Header>IBM Delivery Metrics</Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                    {Object.keys(omsDataObj).length > 0 && <Col><LineChart data={omsDataObj} chartName='IBM OMS'></LineChart></Col>}
                        {Object.keys(aemDataObj).length > 0 && <Col><LineChart data={aemDataObj} chartName='IBM AEM'></LineChart></Col>}
                        
                    </Row>
                    <Row>
                    {Object.keys(uiDataObj).length > 0 && <Col><LineChart data={uiDataObj} chartName='IBM Frontend'></LineChart></Col>}
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