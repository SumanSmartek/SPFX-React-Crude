import {IDropdownOption,IDatePickerStrings,IChoiceGroupOption } from 'office-ui-fabric-react/lib';

export const CountryOptions = [
    { key: 'India', name: 'India' },
    { key: 'USA', name: 'USA' },
    { key: 'China', name: 'China' },
  ];
  export const SexOptions: IChoiceGroupOption[] = [
    { key: 'Male', text: 'Male' },
    { key: 'Female', text: 'Female' }
  ];
  export const TechnologyOptions: IChoiceGroupOption[] = [
    { key: 'HTML', text: 'HTML' },
    { key: 'Java', text: 'Java' },
    { key: 'SharePoint', text: 'SharePoint' }
  ];

  export interface ICheckboxInput {
    ID?: number;
    Title: string;
    isChecked?: boolean;
}

  export const checkOptions: ICheckboxInput[] = [
    { ID: 1, Title: 'Apple' },
    { ID: 2, Title: 'Banana' },
    { ID: 3, Title: 'Fig' },
    { ID: 4, Title: 'Grape' },
    { ID: 5, Title: 'Kiwi' },
    { ID: 6, Title: 'Melon' },
    { ID: 7, Title: 'Orange' },
    { ID: 8, Title: 'Pineapple' }
  ];
  
  export const DatePickerStrings: IDatePickerStrings = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year',
    invalidInputErrorMessage: 'Invalid date format.'
  };
  export const FormatDate = (date): string => {
    console.log(date);
    var date1 = new Date(date);
    var year = date1.getFullYear();
    var month = (1 + date1.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date1.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + year;
  };