import {Component, Input, OnInit} from '@angular/core';
import {Contract} from "../Contract.model";
import {ContractType} from "../contractType.enum";
import {ContractStatus} from "../contractStatus.enum";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {
  @Input() contract: any;
  contractForm!: FormGroup;
  date = new Date()
  contractName = "";
  type = "";
  status = "";

  ngOnInit(): void {
    this.contractForm = this.formBuilder.group({
      contractName: [null],
      employee: this.formBuilder.group({
        id: [null],
      }),
      period: this.formBuilder.group({
        startDate: [null],
        endDate: [null]
      }),
      status: [null],
      type: [null],
      notes: [null],
    });
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  protected readonly ContractType = ContractType;
  protected readonly ContractStatus = ContractStatus;

  updateContract(id: string) {
    const url = 'http://localhost:8080/api/contracts'
    const contract = {
      "id": id,
      "contractName": this.contractName,
      "period": {
        "startDate": "2024-07-01",
        "endDate": "2023-12-31"
      },
      "status": this.status,
      "type": this.type
    }
    this.http.patch(url, contract).subscribe({
      next: res => {
        alert("update success")
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      }, error: err => {
        alert("update failed")
      }
    })
  }
}
