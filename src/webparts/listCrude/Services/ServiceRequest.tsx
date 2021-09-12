
import { sp } from '@pnp/sp/presets/all';
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';
import {IListStates,IListItems} from '../components/IListState'
export class RequestServices {
    /*
public BindDropDown(listName: string,DropDownType: string,pnpSelect: string,pnpExpand: string,pnpFilter: string):Promise<IDropdownOption[]>{
    return new Promise<IDropdownOption[]>(async(resolve,reject)=>{
        pnp.sp.web.lists.getByTitle(listName).items
        .filter(pnpFilter)
        .select(pnpSelect)
        .expand(pnpExpand).top(1000).orderBy("ID", true)
        .get()
        .then((results:any)=>{
            var DropdownOption : IDropdownOption[] = [];
            if(DropDownType=='AETLeader'){          
                results.map((result)=>{
                DropdownOption.push({key:result.AET_x0020_LeaderId,text:result.AET_x0020_Leader.Title});
                });
            }else if(DropDownType=='LegacyServiceApprover'){
                results.map((result)=>{
                    DropdownOption.push({key:result.LegacyServiceApproverId,text:result.LegacyServiceApprover.Title});
                    });
            }else{               
                results.map((result)=>{
                DropdownOption.push({key:result.Id,text:result.Title});
                });
            }
            resolve(DropdownOption);
        },(error:any)=>{
            $('#loading').hide();
            console.log(error);
            reject('Error Occured');
        })
        .catch(function(data) {
            $('#loading').hide();
            console.log(data.data.responseBody["odata.error"].message.value);
        });

    });
    
}



public UpdateLegacyServiceDetails(listName: string,Body,ItemId:number):Promise<string>{
    return new Promise<string>((resolve,reject)=>{
        pnp.sp.web.lists.getByTitle(listName).items
        .getById(ItemId)
        .update(Body)
        .then((results:any)=>{
            resolve(results);
    },(error:any)=>{
        $('#loading').hide();
        console.log(error);
        reject('Error Occured');
    });
    });

}
public GetLegacyServiceDetails(listName: string,pnpSelect: string,pnpExpand: string,pnpFilter: string):Promise<any[]>{
    return new Promise<any[]>((resolve,reject)=>{
        pnp.sp.web.lists.getByTitle(listName).items
        .filter(pnpFilter)
        .select(pnpSelect)
        .expand(pnpExpand)
        .get()
        .then((results: any[])=>{
            // if(listName == "ME%20Leader"){resolve(results[0].ME_x0020_Leader.EMail);}else{
            resolve(results);
        // }
    },(error:any[])=>{
        $('#loading').hide();
        console.log(error);
        reject('Error Occured');
    })
    })

}


public updateDocumentLibrary(MainIndex) {
    try{
    pnp.sp.web.lists.getByTitle('LegacyServiceAttachments').items
    .getById(MainIndex)
    .delete()
          // .then(function(newRequest) {
            .then((newRequest) => {
              alert('Document deleted successfully..');
              console.log(newRequest);
          })
          // (error: any): void => {
            .catch((error)=>{
            //   $('#loading').hide();
            $('#loading').hide();
              console.log("Error in updateDocumentLibrary : ", error.message);  
            // this.setState({ status: "Not Ready" });
          });
        } catch (error) {  
            $('#loading').hide();
          console.log("Error in updateDocumentLibrary : ", error.message);  
        //   this.setState({ status: "Not Ready" });
        }
}

public UpdateDocument(listName:string,DocType:string,DocumentArray:any,LegacyServiceId:string):Promise<string>{
    // try{
        return new Promise<string>((resolve,reject)=>{
   var array = DocumentArray;
   for (var i = 0; i < array.length; i++) {
    //  if (array[i] != undefined) {
       var temp = array[i].toString().split('|');
       pnp.sp.web.lists.getByTitle(listName).items.getById(parseInt(temp[1])).update({
        FormID: LegacyServiceId,
        BeforeAfter:DocType
       }).then((results:any)=>{
         console.log("Add New document in IOM_CRM_Attachments :  " + LegacyServiceId); 
         resolve(results);
    },(error:any)=>{
        console.log(error);
        reject('Error Occured');
    });
        }
    });
}

public GetLegacyServiceDocuments(listName:string,LegacyServiceId:string):Promise<any[]>{
    try{
    return new Promise<any[]>((resolve,reject)=>{
    pnp.sp.web.lists.getByTitle(listName).items
    .filter("FormID eq "+LegacyServiceId+"")
    .select("EncodedAbsUrl","File/Name","Id","BeforeAfter")
    .expand("File").get().then((items: any[]) => {
      var str = [];
      var DocsArray = [];
    //   for (var i = 0; i < items.length; i++) {
    //     if (items[i] != undefined) {
    //       DocsArray.push(items[i].Id);
    //     str.push(<li >&nbsp; <a href={items[i].EncodedAbsUrl} id={items[i].Id} target="_blank">{items[i].File.Name}</a></li>);
    //       //  str.push(<li key={tempx[0]} onClick={this.onChangeDeleteDocument.bind(this)} data-id={tempx[1]}> Uploaded File : {tempx[0]} - <a >Delete </a></li>);
    //     }
    //   }
      //  this.state.getData.push(<ul>{str}</ul>);
    //   this.setState({getDocumentData:str});
    //   this.setState({PreviousDocs:DocsArray});
    resolve(items);
        },(error:any[])=>{
            console.log(error);
            reject('Error Occured');
        })
    })
  } catch (error) {  
    $('#loading').hide();
    console.log("Error in GetIOMDocuments : ", error.message);  
    // this.setState({ status: "Not Ready" });
  } 
}

*/

public getUserProperties(webUrl, context, userLogin) {
    return new Promise<any[]>((resolve,reject)=>{
    debugger;
  //let apiUrlold = this.props.webURL + "/_api/SP.UserProfiles.PeopleManager/GetUserProfilePropertyFor(accountName=@v)?@v='" + encodeURIComponent("i:0#.f|membership|") + userEmail + "'";  
  let apiUrl = webUrl + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='" + encodeURIComponent('i:0#.f|membership|amitd@smartek21.com') +"'";
  //let apiUrl = this.props.webURL + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='" + encodeURIComponent('"'+userLogin+'"') +"'";
  let httpClient: SPHttpClient = context.spHttpClient;  
     httpClient.get(apiUrl, SPHttpClient.configurations.v1).then(response => {
      debugger;
       response.json().then(responseJson => {
          debugger;
          resolve(responseJson.UserProfileProperties);         
            },(error:any[])=>{
                console.log(error);
                reject('Error Occured');
            });
        })
    })
}

public getCurrentUserDetails(webUrl, context) {
    return new Promise<any[]>((resolve,reject)=>{
    debugger;
  //let apiUrlold = this.props.webURL + "/_api/SP.UserProfiles.PeopleManager/GetUserProfilePropertyFor(accountName=@v)?@v='" + encodeURIComponent("i:0#.f|membership|") + userEmail + "'";  
  let apiUrl = webUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties";
  //let apiUrl = this.props.webURL + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='" + encodeURIComponent('"'+userLogin+'"') +"'";
  let httpClient: SPHttpClient = context.spHttpClient;  
     httpClient.get(apiUrl, SPHttpClient.configurations.v1).then(response => {
      debugger;
       response.json().then(responseJson => {
          debugger;
          resolve(responseJson.UserProfileProperties);         
            },(error:any[])=>{
                console.log(error);
                reject('Error Occured');
            });
        })
    })
}

public AddRequestDetails(webUrl, context,body):Promise<string>{
    debugger;
    return new Promise<string>((resolve,reject)=>{
     let apiUrl = webUrl + "/_api/web/lists/getbytitle('MyList')/items";
     let httpClient: SPHttpClient =  context.spHttpClient;  
     httpClient.post(apiUrl, SPHttpClient.configurations.v1,
        
        {  
            headers: {  
              'Accept': 'application/json;odata=nometadata',  
              'Content-type': 'application/json;odata=nometadata',  
              'odata-version': ''  
            },  
            body: JSON.stringify(body)  
          }
        
        )
        .then((response: SPHttpClientResponse): Promise<IListItems> => {  
            return response.json();  
          }) 
          .then((item: IListItems): void => {  
            alert(`Item '${item.Title}' (ID: ${item.Id}) successfully created`);  
          }, (error: any): void => {  
            alert('Error while creating the item: ' + error);  
          });
        })
  }

  public UpdateRequestDetails(itemID):Promise<string>{
    debugger;
    return new Promise<string>((resolve,reject)=>{
      sp.web.lists.getByTitle('MyList').items
      .getById(itemID)
      .update({
             Title:"Updated Title"
           })
      .then((results:any)=>{
          resolve(results);
      },(error:any)=>{
          //$('#loading').hide();
          console.log(error);
          reject('Error Occured');
      });
    })
  }

  public GetRequestDetails(context){
    debugger;
    return new Promise<any[]>((resolve,reject)=>{
      let apiUrl = "https://st21.sharepoint.com/sites/GCForms/_api/web/Lists/getbytitle('MyList')/items";
      let httpClient: SPHttpClient = context.spHttpClient;  
         httpClient.get(apiUrl, SPHttpClient.configurations.v1).then(response => {
          debugger;
           response.json().then(responseJson => {
            debugger;
            resolve(responseJson.value);         
              },(error:any[])=>{
                  console.log(error);
                  reject('Error Occured');
              });
          })
      })
  }

  public GetMyApprovals(context){
    debugger;

    //Filter by LoginName (i:0#.f|membership|r@tenant-name.onmicrosoft.com)
    let userToken = `i:0#.f|membership|${context.pageContext.user.loginName}`;
    debugger
    return sp.web.lists.getByTitle('MyList').items
    //.filter(`AssignedTo/Name eq '${encodeURIComponent(userToken)}'`)
    .filter(`AssignedTo/EMail eq '${encodeURIComponent(context.pageContext.user.email)}'`)
    //.filter(`Author/EMail eq '${encodeURIComponent(context.pageContext.user.email)}'`)
    .select('Title','AssignedTo/Name','AssignedTo/ID','AssignedTo/EMail','AssignedTo/Title')
    .expand("AssignedTo")
    .get();
  }

  public GetFilteredRecord(titleVal){

    debugger
    return sp.web.lists.getByTitle('MyList').items
    .filter(`Title eq '${encodeURIComponent(titleVal)}'`)
    .select('Title','Description','Sex','AssignedTo/Name','AssignedTo/ID','AssignedTo/EMail','AssignedTo/Title')
    .expand("AssignedTo")
    .get();
  }

  public GetMyApprovalsRestAPI(context) {
    return new Promise<any[]>((resolve,reject)=>{
      let apiUrl = "https://st21.sharepoint.com/sites/GCForms/_api/web/Lists/getbytitle('MyList')/items?$filter=AssignedTo/EMail eq '" + context.pageContext.user.email + "'&$select=AssignedTo/ID,AssignedTo/EMail,AssignedTo/Title&$expand=AssignedTo";
      let httpClient: SPHttpClient = context.spHttpClient;  
          httpClient.get(apiUrl, SPHttpClient.configurations.v1).then(response => {
          debugger;
            response.json().then(responseJson => {
            debugger;
            resolve(responseJson.value);         
              },(error:any[])=>{
                  console.log(error);
                  reject('Error Occured');
              });
          })
      })
  }
    

  public BindDropDown(listName: string,DropDownType: string,pnpSelect: string):Promise<IDropdownOption[]>{
    return new Promise<IDropdownOption[]>(async(resolve,reject)=>{
        sp.web.lists.getByTitle(listName).items
        //.filter(pnpFilter)
        .select(pnpSelect)
        //.expand(pnpExpand).top(1000).orderBy("ID", true)
        .orderBy("ID", true)
        .get()
        .then((results:any)=>{
            var DropdownOption : IDropdownOption[] = [];
            if(DropDownType=='Country'){          
                results.map((result)=>{
                DropdownOption.push({key:result.Id,text:result.Title});
                });
            }
            resolve(DropdownOption);
        },(error:any)=>{
            //$('#loading').hide();
            console.log(error);
            reject('Error Occured');
        })
        .catch(function(data) {
            //$('#loading').hide();
            console.log(data.data.responseBody["odata.error"].message.value);
        });

    });
    
}


}