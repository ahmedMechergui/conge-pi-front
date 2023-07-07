import {Component, Input, OnInit} from '@angular/core';
import {Contract} from "../Contract.model";

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {
  @Input() contract?: Contract;


  ngOnInit(): void {
  }

}
