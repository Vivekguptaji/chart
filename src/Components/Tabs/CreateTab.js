import BarChart from "../Charts/BarChart";
import { useEffect, useState } from "react";
import { Tab, Tabs,Row,Col } from "react-bootstrap";
import BasicExport from "../Reports/BasicExport";
import SummaryPanel from "../SummaryPanel/SummaryPanel";
import StoryPointChart from "../Charts/StoryPointChart";
import StoryPointReport from "../Reports/StoryPointReport";

function CreateTab(props) {
    const [tabs, setTabs] = useState();
    let comingData = props.data;
    let chartData = props.data[props.updatedChartIndex]['chartData'];
    let storyPoint = props.data[props.updatedChartIndex]['storyPoint'];
    debugger;
    useEffect(() => {
        let generatedTabs = comingData.map(item => {
            return <Tab eventKey={item['name']} key={item['name']} title={item['name']}>
                <Row>
                    <Col><SummaryPanel data={item} onStatusFiledChange={props.onStatusFiledChange} ></SummaryPanel></Col>
                </Row>
                
                <Row>
                    <Col><BarChart data={item['chartData']}></BarChart></Col>
                    <Col><StoryPointChart data={item['storyPoint']}></StoryPointChart></Col>
                </Row>
                <Row>
                    <Col>
                        <StoryPointReport data={item['storyPoint']} fileName={item['name']}></StoryPointReport>
                    </Col>
                    <Col>
                        <BasicExport data={item['loadedData']} fileName={item['name']}></BasicExport>
                    </Col>
                </Row>
            </Tab>
        })
        setTabs(generatedTabs);
    }, [props.data.length, chartData, storyPoint]);
    return (
        <Tabs
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
        >
            {tabs}
        </Tabs>)
}

export default CreateTab;