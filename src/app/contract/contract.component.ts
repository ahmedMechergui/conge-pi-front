import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Contract} from "./Contract.model";
import {ContractStatus} from "./contractStatus.enum";
import {ContractType} from "./contractType.enum";
import SignaturePad from "signature_pad";
import {ContractService} from "./contract.service";


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  signPad: any;
  @ViewChild('signPadCanvas', {static: false}) signaturePadElement: any;
  signImage: any;
  Contracts: Contract[] = [
  ]

  constructor(private contractService: ContractService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.signPad = new SignaturePad(this.signaturePadElement.nativeElement);
  }

  /*It's work in devices*/
  startSignPadDrawing(event: Event) {
    console.log(event);
  }

  /*It's work in devices*/
  movedFinger(event: Event) {
  }

  /*Undo last step from the signature*/
  undoSign(event: Event) {
    // @ts-ignore
    event.preventDefault();
    const data = this.signPad.toData();
    if (data) {
      data.pop(); // remove the last step
      this.signPad.fromData(data);
    }
  }

  /*Clean whole the signature*/
  clearSignPad(event: Event) {
    // @ts-ignore
    event.preventDefault();
    this.signPad.clear();
  }

  saveSignPad(event: Event) {
    // @ts-ignore
    event.preventDefault();
    this.signImage = this.signPad.toDataURL();
    console.log(this.signImage);
    this.contractService.uploadFiles(this.signImage).subscribe(
      response => {
        console.log('Files uploaded successfully', response);
      },
      error => {
        console.error('Error uploading files', error);
      }
    );

  }

  protected readonly ContractStatus = ContractStatus;


  cancel(event: Event) {
    event.preventDefault();
  }

  saveContract(event: Event) {
    // @ts-ignore
    event.preventDefault();
  }


  selectedContract: any;

  selectContract(contract: any) {
    this.selectedContract = contract;
  }
}
