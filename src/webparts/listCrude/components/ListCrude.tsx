import * as React from 'react';
import styles from './ListCrude.module.scss';
import { IListCrudeProps } from './IListCrudeProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Web, IWeb, sp } from "@pnp/sp/presets/all";
import {PrimaryButton} from 'office-ui-fabric-react'
import NewForm from './NewForm';
import ViewForm from './ViewForm';
//Custom Service Import
import {RequestServices} from '../Services/ServiceRequest';

export default class ListCrude extends React.Component<IListCrudeProps, any> {

  public myServices: RequestServices;

  constructor(props){
    super(props);
    this.state={
      itemColl:[],
      item:'',
      edit:false,
      loadNewEdit:false,
      loadView:false
    }
    this.myServices=new RequestServices();
  }

  componentDidMount(){
    this.myServices.GetRequestDetails(this.props.context).then((itemColl)=>{
      console.log(itemColl);
      debugger;
      this.setState({itemColl:itemColl},()=>{
        //this.setState({item:"Added"})
      });
    })
  }

  viewDetails(itemId){
    var item=this.state.itemColl.filter(value => value.Id == itemId)[0];
    this.setState({item:item});
    debugger;
    this.setState({loadView:true});
    this.setState({loadNewEdit:false});
    this.setState({edit:false});
  }

  viewMyApproval(){
    this.myServices.GetMyApprovalsRestAPI(this.props.context).then((itemColl)=>{
      console.log(itemColl);
      debugger;
      this.setState({itemColl:itemColl},()=>{
        //this.setState({item:"Added"})
      });
    })
  }

  addeditDetails(edit,itemId?){
    debugger;

    this.setState({loadNewEdit:true});
    this.setState({loadView:false})
    if(edit){
      var item=this.state.itemColl.filter(value => value.Id == itemId)[0];
      this.setState({item:item});
      this.setState({edit:true});
      debugger;
    }
    else{
      this.setState({edit:false});
      this.setState({item:''});
    }
  }

  filterRecord(item){
    this.myServices.GetFilteredRecord(item).then((itemColl)=>{
      console.log(itemColl);
      debugger;
      this.setState({itemColl:itemColl},()=>{
        //this.setState({item:"Added"})
        console.log('Item Fetched');
        debugger;
      });
    })
  }
  public render(): React.ReactElement<IListCrudeProps> {
    const {itemColl,item,edit,loadNewEdit,loadView} =this.state;
    debugger;
    return (
      <div className={ styles.listCrude }>
        <PrimaryButton onClick={()=>this.addeditDetails(false)}>Add New</PrimaryButton>
        <PrimaryButton onClick={()=>this.viewMyApproval()}>View My Approval</PrimaryButton>
        <PrimaryButton onClick={()=>this.filterRecord('suman')}>Filter Record</PrimaryButton>
        <table><tr><td>SRNo</td><td>Title</td><td>Description</td><td>Sex</td></tr>
        {itemColl.map((item,index)=>{
          return(
            <tr>
              <td>{index+1}</td>
              <td>{item.Title}</td>
              <td>{item.Description}</td>
              <td>{item.Sex}</td>
              <td><PrimaryButton onClick={()=>{this.viewDetails(item.Id)}}>View</PrimaryButton></td>
              <td><PrimaryButton onClick={()=>{this.addeditDetails(true,item.Id)}}>Edit</PrimaryButton></td>
            </tr>)           
        })}
        </table>
        {loadView && <ViewForm item={item} services={this.myServices} context={this.props.context} webURL={this.props.webURL}/>}
        {loadNewEdit && <NewForm edit={edit} currentItem={item} services={this.myServices} context={this.props.context} webURL={this.props.webURL}/>}
      </div>
    );
  }
}
