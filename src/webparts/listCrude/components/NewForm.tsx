import * as React from 'react';
import styles from './ListCrude.module.scss';
import { IListCrudeProps } from './IListCrudeProps';
import { IListStates } from './IListState';

//Custom Field Office UI Fabric
import { DatePicker, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { TextField,Dropdown,IDropdownOption,Label,PrimaryButton,ChoiceGroup,IChoiceGroupOption } from 'office-ui-fabric-react/lib';
import { Checkbox} from 'office-ui-fabric-react/lib/Checkbox';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

//Custom Variable Import
import {CountryOptions,SexOptions,TechnologyOptions,DatePickerStrings,FormatDate,checkOptions} from './IListVariable';

export default class NewForm extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
          Items: [],
          ItemID:0,
          CountryColl:[],
          EmpId:'',
          EmpName:'',
          EmpEmail:'',
          EmpJobTitle:'',
          EmpManagerName:'',
          FormHireDate:new Date(),
          FormCountry:'',
          FormDescription:'',
          FormSex:'',
          FormTechnology:''
        };
        this._submiteData=this._submiteData.bind(this);
        this._updateData=this._updateData.bind(this);
        this._onChange=this._onChange.bind(this);
        this._onChangeCheck=this._onChangeCheck.bind(this);
        this.onChoiceChange=this.onChoiceChange.bind(this);
      }

      componentDidMount(){
        this.getLoggedUserDetails();
        this.getCountryFromList();
        if(this.props.edit){
          this.setState({ FormCountry: this.props.currentItem.Country });
          this.setState({ FormDescription: this.props.currentItem.Description });
          this.setState({ ItemID: this.props.currentItem.Id });
        }
      }

      static getDerivedStateFromProps(props, state) {// Any time the current user changes,// Reset any parts of state that are tied to that user.// In this simple example, that's just the email.if (props.userID !== state.prevPropsUserID) {return {
       
        if(props.currentItem && state.currentItem  && props.currentItem.Country !==  state.currentItem.Country) {
         return { FormCountry: props.currentItem.Country ,
          FormDescription: props.currentItem.Description }
        }
        return null;
      }

      public _getPeoplePickerItems = async (items: any[]) => {
        if (items.length > 0) {
           this.setState({ EmpName: items[0].text });
           this.setState({ EmpId: items[0].id });
        }
        else {
          //ID=0;
          this.setState({ EmpName: "" });
          this.setState({ EmpId: "" });
        }
      }

      private _onChange(event){
        //event.preventDefault();
        //this.setState({[event.target.name]: event.target.value});
        this.setState({[event.target.name]: event.target.value});

        debugger;
      }

      public onChoiceChange(ev, option: any): void {  
        this.setState({[ev.target.name]: option.key});  
        console.log(this.state)
        debugger;
    }
      private _submiteData(){
        let body:any={
          "Title":'test',
          "Country":this.state.FormCountry,
          "Description":this.state.FormDescription,
          "HireDate":this.state.FormHireDate,
          //"Technology":this.state.FormTechnology,
          "Sex":this.state.FormSex,
          "AssignedToId":this.state.EmpId
        }
        this.props.services.AddRequestDetails(this.props.webURL,this.props.context,body).then(res=>{
             console.log('Item Added');
        })
      }

      private getCountryFromList(){
        //listName: string,DropDownType: string,pnpSelect: string
        this.props.services.BindDropDown('Country','Country','Title').then(res=>{
          this.setState({CountryColl:res})
          debugger;
        })
      }

      private _updateData(){
        let body:any={
          "Title":'test',
          "Country":this.state.FormCountry,
          "Description":this.state.FormDescription,
          "HireDate":this.state.FormHireDate,
          //"Technology":this.state.FormTechnology,
          "Sex":this.state.FormSex,
          "AssignedToId":this.state.EmpId
        }
        this.props.services.UpdateRequestDetails(parseInt(this.state.ItemID),JSON.stringify(body)).then(res=>{
             alert('Item Updated');
        })
      }

      

      private getLoggedUserDetails() {
        this.props.services.getCurrentUserDetails(this.props.webURL,this.props.context).then((res)=>{
          console.log(res);

          this.setState({Items:res})

          this.state.Items.map(item=>{
            if(item.Key=='SPS-UserPrincipalName'){
              this.setState({EmpEmail:item.Value})
            }
            else if(item.Key=='Manager'){
              this.setState({EmpManagerName:item.Value})
            }
            else if(item.Key=='SPS-JobTitle'){
              this.setState({EmpJobTitle:item.Value})
            }
            else if(item.Key=='FirstName'){
              this.setState({EmpName:item.Value})
            }
          })
        })
        .then(()=>{
          this.props.services.GetRequestDetails(this.props.context).then((res)=>{
            debugger;
            console.log(res)
          })
        })
      }

      _onChangeCheck(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
        debugger;
        //console.log("The option has been changed to ${isChecked}.");
        console.log(`The option ${ev.currentTarget.title} has been changed to ${isChecked}`);
      }

    public render(): React.ReactElement<IListCrudeProps> {

        //let countriesList = CountryOptions.length > 0
        let countriesList = this.state.CountryColl.length > 0
        && this.state.CountryColl.map((item, i) => {
        return (
          // <option key={i} value={item.key}>{item.name}</option>
          <option key={i} value={item.text}>{item.text}</option>
        )
        }, this);

        return(
            <div>
            <h3>User Profile</h3>
            <table>
              <tr><td>Employee Name</td><td>{this.state.EmpName}</td></tr>
              <tr><td>Employee Email</td><td>{this.state.EmpEmail}</td></tr>
              <tr><td>Manager Name</td><td>{this.state.EmpManagerName}</td></tr>
              <tr><td>Job title</td><td>{this.state.EmpJobTitle}</td></tr>
            </table>
            
            <h3>Add Request Details Section</h3>

            <Label>Employee Name</Label>
                  <PeoplePicker
                    context={this.props.context}
                    personSelectionLimit={1}
                    // defaultSelectedUsers={this.state.EmployeeName===""?[]:this.state.EmployeeName}
                    required={false}
                    onChange={this._getPeoplePickerItems}
                    defaultSelectedUsers={[this.state.EmpName?this.state.EmpName:""]}
                    showHiddenInUI={false}
                    principalTypes={[PrincipalType.User]}
                    resolveDelay={1000}
                    ensureUser={true}
                  />

            <Label>Select Country</Label>
            <select value={this.state.FormCountry} onChange={(e) => this.setState({FormCountry: e.target.value})}>
              {countriesList}
            </select>

            <TextField
              label="Description"
              id="txtDescription"
              required={false}
              multiline={true}
              value={this.props.currentItem.Description}
              name='FormDescription'
              onChange={this._onChange}
              />
              
            <ChoiceGroup id="sex" defaultSelectedKey="Male" 
                options={SexOptions} 
                onChange={this.onChoiceChange} name='FormSex'
                label="Sex"
                selectedKey={this.state.FormSex}
                required={true} />

            <Label>Select Fruits(multiselect)</Label>
            {
              checkOptions.map((checkBoxItem: any) => {
                return (
                    <Checkbox label={checkBoxItem.Title} title={checkBoxItem.Title} onChange={this._onChangeCheck} />
                  );
                })
            }

            <Label>Hire Date</Label>
            <DatePicker maxDate={new Date()} allowTextInput={false} strings={DatePickerStrings}
              value={this.state.FormHireDate}
              onSelectDate={(e) => { this.setState({FormHireDate: e });}}
              ariaLabel="Select a date" formatDate={FormatDate} />
            <PrimaryButton onClick={this.props.edit ?this._updateData:this._submiteData}>Submit</PrimaryButton>
        </div>
        )
    }
}
