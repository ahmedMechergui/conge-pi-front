import {Component, Input, OnInit} from '@angular/core';
import {Contract} from "../Contract.model";
import {ContractType} from "../contractType.enum";
import {ContractStatus} from "../contractStatus.enum";

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {
  @Input() contract?: any;


  ngOnInit(): void {
  }

  protected readonly ContractType = ContractType;
  protected readonly ContractStatus = ContractStatus;
}
