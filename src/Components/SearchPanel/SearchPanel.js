
import { Accordion } from "react-bootstrap";
import ExcelReader from "../../ExcelReader/ExcelReader";  
import { useEffect, useState } from "react";
import CreateTab from '../Tabs/CreateTab'
let requiredData = [];
function SearchPanel() {
    const [tableData, setTableData] = useState([]);
    const [fileName, setFileName] = useState();
    const [shareData, setShareData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState();
    let updatedData = [];
    const onStatusFiledChange = (values,data) => { 
        setSelectedStatus(values) 
        updatedData.push({
            name: data.name,
            loadedData: data.loadedData,
            developerGroupData: generateDeveloperGroupData(data.loadedData, false),
            statusLookup: generateStatusLookupData(data.loadedData, false),
            storyPoint: generateDeveloperStoryPointData(data.loadedData, true,values),
            chartData: generateChartGroupData(data.loadedData, true,values)
        }); 
        setShareData(updatedData);
    } 
    const generateDeveloperGroupData = (parsedData,statusChange) => {
        let obj = {};
        parsedData.map(item => {
            if (obj[item.Developer]) {
                obj[item.Developer] += 1;
            }
            else {
                obj[item.Developer] = 1;
            }
        })
        return obj;
    }
    const generateDeveloperStoryPointData = (parsedData,statusChange,selectedStatus) => {
        let obj = {};
        parsedData.map(item => { 
            let storyPoint = !item['Story Points'] ? 0 : item['Story Points'];
            let isDo = statusChange; 
            if (isDo) {
                let findItem = selectedStatus.filter(items => items.value === item.Status).length > 0
            
                if (findItem) {
                    if (obj[item.Developer]) {
                        obj[item.Developer] += storyPoint;
                    }
                    else {
                        obj[item.Developer] = storyPoint;
                    }
                }
            }
            else {
                if (obj[item.Developer]) {
                    obj[item.Developer] += storyPoint;
                }
                else {
                    obj[item.Developer] = storyPoint;
                }
            }
        })
        return obj;
    }
    const generateStatusLookupData = (parsedData,statusChange) => {
        let obj = {};
        parsedData.map(item => {
            if (!obj[item.Status]) {
                obj[item.Status] = item.Status;
            }
        });
        return obj;
    }
    const generateChartGroupData = (parsedData,statusChange,selectedStatus) => {
        let obj = {};
        parsedData.map(item => { 
            let isDo = statusChange;  
            if (isDo) {
                let findItem = selectedStatus.filter(items => items.value === item.Status).length > 0
            
                if (findItem) {
                    if (obj[item.Status]) {
                        obj[item.Status] += 1;
                    }
                    else {
                        obj[item.Status] = 1;
                    }
                }
            }
            else {
                if (obj[item.Status]) {
                    obj[item.Status] += 1;
                }
                else {
                    obj[item.Status] = 1;
                }
            }
        })
        return obj;
    }
    const exportedData = (data, name) => {
        let parsedData = JSON.parse(data);
        requiredData.push({
            name: name,
            loadedData: parsedData,
            developerGroupData: generateDeveloperGroupData(parsedData,false),
            statusLookup: generateStatusLookupData(parsedData,false),
            storyPoint: generateDeveloperStoryPointData(parsedData,false),
            chartData: generateChartGroupData(parsedData,false)
        })
        setTableData(parsedData);
        console.log(requiredData);
        setShareData(requiredData);        
        setFileName(name);
    } 
    return <>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Upload CSV File</Accordion.Header>
                <Accordion.Body>
                    <ExcelReader exportedData={exportedData}></ExcelReader>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        {tableData.length > 0 && <CreateTab data={shareData} onStatusFiledChange={ onStatusFiledChange} ></CreateTab>}
       
        
    </>
}
export default SearchPanel;