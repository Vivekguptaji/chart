import React, { Component } from "react";
import XLSX from "xlsx";
import { make_cols } from '../ExcelReader/MakeColumns'; 
import { Form,Button,Toast } from "react-bootstrap"; 
class ExcelReader extends Component {
  inputField;
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      showToast: false
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const files = e.target.files;
    this.inputField = e.target;
    if (files && files[0]) this.setState({ file: files[0], showToast: false });
    
  }

  handleFile() {
    /* Boilerplate to set up FileReader */ 
    if (!this.state.file['name']) {
      this.setState({ showToast: true });
      return
    }
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws["!ref"]) }, () => {
        let data = JSON.stringify(this.state.data, null, 2);
        this.props.exportedData(data, this.state.file.name)
        console.log();
        this.inputField.value = null;
        this.setState({ file: {} })
      });
    };
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    }
  }

  render() {
   
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Upload Excel to process the report</Form.Label>
          <Form.Control type="file"
            onChange={this.handleChange}></Form.Control>
        </Form.Group>
        {this.state.showToast &&
          <Form.Group className="errorMsg">
            <Form.Label>Please select the file to process the report</Form.Label>
          </Form.Group>}
        <Form.Group className="mb-3" style={{textAlign:'center'}} controlId="formBasicPassword">
          <Button variant="dark" onClick={this.handleFile}>Process</Button>{' '}
        </Form.Group>
      </Form>)
  }
  
}

export default ExcelReader;
