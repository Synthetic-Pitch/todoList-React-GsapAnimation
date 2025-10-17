
export interface DataItem {
    id:string,
    text:string,
}
export interface TodoType {
    todo:string,
    id:string,
    item:DataItem[],
    done:Boolean,
    dateToAcomplish:string
}
export interface DateType {
    isOpen:boolean,
    date:Date | null
}