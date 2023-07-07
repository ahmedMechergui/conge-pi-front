import {ContractStatus} from "./contractStatus.enum";
import {ContractType} from "./contractType.enum";

export interface Contract{
  emplyeeId:string,
  contractName: string;
  employee:string;
  status:ContractStatus;
  type:ContractType;
  period:string;
}
