
import { Accordion } from "react-bootstrap";
import ExcelReader from "../../ExcelReader/ExcelReader";  
import { useState } from "react";
import CreateTab from '../Tabs/CreateTab';
import config from '../../Utility/Config';
let requiredData = [];
let uploadedFilesData = [];
let onStatusFiledChange;
let dashboardChartObj = {
    oms:{},
    ui: {},
    aem: {}
}
function SearchPanel(props) {
    const [tableData, setTableData] = useState([]);
    const [fileName, setFileName] = useState();
    const [shareData, setShareData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState();
    const [updatedChartIndex, setUpdatedChartIndex] = useState(0);
    
    let updatedData = [...requiredData];
    let comingConfig = config;
      onStatusFiledChange = (values, data) => {
        setSelectedStatus(values)
        let obj = {
            name: data.name,
            loadedData: data.loadedData,
            developerGroupData: generateDeveloperGroupData(data.loadedData, false),
            statusLookup: generateStatusLookupData(data.loadedData, false),
            storyPoint: generateDeveloperStoryPointData(data.loadedData, true, values),
            chartData: generateChartGroupData(data.loadedData, true, values),
            issueType: generatIssueTypeGroupData(data.loadedData, true, values),
            sprintName:data.loadedData[0][comingConfig.sprintName]
        };
        let index = requiredData.findIndex(item => item.name === data.name);
        updatedData[index] = obj;
        setUpdatedChartIndex(index);
        setShareData(updatedData);
        requiredData = updatedData;
    }
    const generatIssueTypeGroupData = (parsedData, statusChange, selectedStatus) => {
        let obj = {};
        parsedData.forEach(item => {
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
                if (comingConfig.status[[item.Status]] && comingConfig.issueType[[item['Issue Type']]]) {
                    if (obj[item['Issue Type']]) {
                        obj[item['Issue Type']] += 1;
                    }
                    else {
                        obj[item['Issue Type']] = 1;
                    }
                }
            }
        })
        return obj;
    }
    const generateDeveloperGroupData = (parsedData, statusChange) => {
        let obj = {};
        parsedData.forEach(item => {
            if (obj[item.Developer]) {
                obj[item.Developer] += 1;
            }
            else {
                obj[item.Developer] = 1;
            }
            
        })
        return obj;
    }
    const generateDeveloperStoryPointData = (parsedData, statusChange, selectedStatus) => {
        let obj = {};
        parsedData.forEach(item => {
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
                if (comingConfig.status[[item.Status]]) {
                    if (obj[item.Developer]) {
                        obj[item.Developer] += storyPoint;
                    }
                    else {
                        obj[item.Developer] = storyPoint;
                    }
                }
            }
        })
        return obj;
    }
    const generateStatusLookupData = (parsedData, statusChange) => {
        let obj = {};
        parsedData.forEach(item => {
            if (!obj[item.Status]) {
                obj[item.Status] = item.Status;
            }
        });
        return obj;
    }
    const generateChartGroupData = (parsedData, statusChange, selectedStatus) => {
        let obj = {};
        parsedData.forEach(item => {
            let isDo = statusChange;
            if (isDo) {
                let findItem = selectedStatus.filter(items => items.value === item.Status).length > 0;            
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
                if (comingConfig.status[[item.Status]]) {
                    if (obj[item.Status]) {
                        obj[item.Status] += 1;
                    }
                    else {
                        obj[item.Status] = 1;
                    }
                }
            }
        })
        return obj;
    }
   const getDashboardChartData = (key,fileNameUploaded, storyPoints, issueTypes, comingData) => {  
       if (fileNameUploaded.toLowerCase().indexOf(key) !== -1) {
           console.log('uploadedFile', fileNameUploaded)
           comingData.forEach(item => { 
               if (!dashboardChartObj[key][item[comingConfig.sprintName]]) {
                dashboardChartObj[key][item[comingConfig.sprintName]] = {
                       storyPoint: Object.values(storyPoints).reduce((a,b)=>a+b),
                       defects: Object.values(issueTypes).reduce((a,b)=>a+b),
                       avgSP: [],
                       linear:[]
                   };
               }
           });
           return dashboardChartObj
       }
     }
    const exportedData = (data, name) => {
        if (name === undefined) {
            return;
        }
        let parsedData = JSON.parse(data);
        let index = requiredData.findIndex(item => item.name === name.split('.')[0]);
        if (index !== -1) {
            requiredData.splice(index, 1)
        }
        let fileNameUploaded = name.split('.')[0];
        let comingStoryPonits = generateDeveloperStoryPointData(parsedData, false);
        let comingIssueTypes = generatIssueTypeGroupData(parsedData, false);
        requiredData.push({
            name: fileNameUploaded,
            loadedData: parsedData,
            developerGroupData: generateDeveloperGroupData(parsedData, false),
            statusLookup: generateStatusLookupData(parsedData, false),
            storyPoint: comingStoryPonits,
            chartData: generateChartGroupData(parsedData, false),
            issueType: comingIssueTypes,
            sprintName: parsedData[0][comingConfig.sprintName],
            dashboardChartData: getDashboardChartData('oms', fileNameUploaded, comingStoryPonits, comingIssueTypes, parsedData),
            uiChartData: getDashboardChartData('ui', fileNameUploaded, comingStoryPonits, comingIssueTypes, parsedData),
            aemChartData: getDashboardChartData('aem', fileNameUploaded, comingStoryPonits, comingIssueTypes, parsedData),
            fullstackChartData: getDashboardChartData('fullstack', fileNameUploaded, comingStoryPonits, comingIssueTypes, parsedData)
        })
        setTableData(parsedData);  
        let fileAdded = uploadedFilesData.findIndex(item => item.value === fileNameUploaded);
        if (fileAdded === -1) {
            uploadedFilesData.push({ value: fileNameUploaded, label: fileNameUploaded });
        } 
        setShareData(requiredData);
        console.log('requiredData',requiredData)
       // setFileName(name);
    }
    const removeTabData = (name) => {
        let index = requiredData.findIndex(item => item.name.indexOf(name) !== -1); 
        if (index !== -1) {
            requiredData.splice(index, 2);
        }
        setShareData(requiredData)
    }
    
    return <>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Upload CSV File</Accordion.Header>
                <Accordion.Body>
                    <ExcelReader options={uploadedFilesData} exportedData={exportedData} onClick={removeTabData }></ExcelReader>
                    { }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        {shareData.length > 0 && <CreateTab data={shareData} removeTabData={removeTabData} updatedChartIndex={updatedChartIndex} onStatusFiledChange={onStatusFiledChange} ></CreateTab>}
    </>
}
export default SearchPanel;