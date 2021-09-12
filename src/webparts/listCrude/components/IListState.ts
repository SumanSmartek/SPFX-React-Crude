export interface IListStates {
    Items: IListItems[];
    EmpId:any;
    EmpName:string;
    EmpEmail:string;
    EmpDept:string;
    EmpJobTitle:string;
    EmpManagerName:string;
    FormHireDate:any,
    FormCountry:string,
    FormDescription:string,
    FormTechnology:string
}

export interface IListItems {
  Title: string;
  Id:string;
}