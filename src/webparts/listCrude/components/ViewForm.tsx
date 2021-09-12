import * as React from 'react';
import styles from './ListCrude.module.scss';
import { IListCrudeProps } from './IListCrudeProps';
import { IListStates } from './IListState';

export default class ViewForm extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
          Items: [],
          EmpId:'',
          EmpName:'',
          EmpEmail:'',
          EmpDept:'',
          EmpJobTitle:'',
          EmpManagerName:'',
          FormHireDate:'',
          FormCountry:'',
          FormDescription:'',
          FormSex:'',
          FormTechnology:''
        };
      }

      componentDidMount(){
        //this.getLoggedUserDetails()
        this.props.services.GetRequestDetails(this.props.context).then((res)=>{
          debugger;
          console.log(res)
        })
      }

    public render(): React.ReactElement<IListCrudeProps> {
        return(
            <div>
            
            <h3>View Request Details Section</h3>
            <table>
              <tr><td colSpan={2}>Current Logged User Details</td></tr>
              <tr><td>Title</td><td>{this.props.item.Title}</td></tr>
              <tr><td>Description</td><td>{this.props.item.Description}</td></tr>
              <tr><td>Country</td><td>{this.props.item.Country}</td></tr>
              <tr><td>Sex</td><td>{this.props.item.Sex}</td></tr>
              <tr><td>Hire Date</td><td>Hire Date</td></tr>
            </table>
        </div>
        )
    }
}
