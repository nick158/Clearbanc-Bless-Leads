import { Link } from "gatsby"
import React, {Component} from "react"
import {TextField, Button} from '@material-ui/core';

import axios from "axios";
class SubmitForm extends Component{
  constructor(props){
    super(props);

    this.state ={
      email: '',
      pass: '',
      url: '',
      submitted: false
    }
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
    this.state.submitted = false;
  };
  validPass = () => {
    let email = this.state.email;
    let url = this.state.url;
    let pass = this.state.pass;
    const { GATSBY_PASS } = process.env;

    if(pass != GATSBY_PASS || url == "" || email == ""){
      return false;
    }else{
      return true;
    }
  }
  submitButton = () => {
    const {GATSBY_MONDAY} = process.env
    if(this.validPass() === false){
    }else{
      let email = this.state.email;
      let url = this.state.url;
      let body = {
        query: `
	mutation ($boardId: Int!, $groupId: String!, $itemName: String!, $columnValues: JSON!) {
	  create_item (
	    board_id: $boardId,
	    group_id: $groupId,
	    item_name: $itemName,
	    column_values: $columnValues
	  ) {
	    id
	  }
	}
  `,
        variables: {
          boardId: 428943437,
          groupId: "topics",
          itemName: "Self Prospecting",
          columnValues: JSON.stringify({ "owner": email, "gsheets_link": url  })
        }
      }
      console.log('query')
      let token = GATSBY_MONDAY;

      axios.post(
        "https://api.monday.com/v2/", body, {
          headers: { Authorization: "Bearer " + token}
        }
      ).then((result) => {
        console.log(result.data);
        this.setState({submitted: true});
      }).catch((err) => {
        console.error(err);
      })

    }
    }


  render() {
    return(
      <p>
        <TextField onChange={this.handleChange('email')} required id="email" label="Email" variant="outlined" />
        <TextField onChange={this.handleChange('url')} required id="link" label="Sheets Link" variant="outlined" />
        <TextField onChange={this.handleChange('pass')} required id="pass" label="Password" type="Password" variant="outlined" />
        <br />
        <Button onClick={this.submitButton} style={{"margin-top": "10px"}} variant="outlined">Bless</Button>
        <br/>
        {!this.state.submitted && <p>Not Submitted Yet 😔</p>}
        {this.state.submitted && <p>Submitted 🎉🙏🏻🎉</p>}
      </p>
    )
  }
}

export default SubmitForm;
