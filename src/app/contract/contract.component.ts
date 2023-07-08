import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Contract} from "./Contract.model";
import {ContractStatus} from "./contractStatus.enum";
import {ContractType} from "./contractType.enum";
import SignaturePad from "signature_pad";
import {ContractService} from "./contract.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  contractForm!: FormGroup;
  signatureId!: string;
  contractsData: any;

  signPad: any;
  @ViewChild('signPadCanvas', {static: false}) signaturePadElement: any;
  signImage: any;
  Contracts: Contract[] = [
    {
      emplyeeId: "1",
      contractName: "cdd",
      employee: "mourad",
      period: "2 ans",
      status: ContractStatus.ACTIVE,
      type: ContractType.CDD
    },
    {
      emplyeeId: "2",
      contractName: "cdi",
      employee: "ahmed",
      period: "2 ans",
      status: ContractStatus.ON_HOLD,
      type: ContractType.CDI
    },
    {
      emplyeeId: "3",
      contractName: "civp",
      employee: "bilel",
      period: "2 ans",
      status: ContractStatus.ENDED,
      type: ContractType.CIVP
    },
    {
      emplyeeId: "4",
      contractName: "freelance",
      employee: "mourad",
      period: "2 ans",
      status: ContractStatus.WAITING_SIGNATURE,
      type: ContractType.FREELANCE
    },
  ]

  constructor(private contractService: ContractService, private formBuilder: FormBuilder, private http: HttpClient) {
  }

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
      content: this.formBuilder.group({
        id: [null],
      }),
      signature: this.formBuilder.group({
        id: [null],
      })
    });

    this.contractService.getContracts().subscribe({
      next: res => {
        console.log(res);
        this.contractsData = res;
        console.log(this.contractsData);
      }, error: err => {
        console.log(err);
      }
    })
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
    event.preventDefault();
    this.signImage = this.signPad.toDataURL();
    console.log(this.signImage);
    const file = this.dataURLtoFile(this.signImage, 'signImage.png');
    this.contractService.uploadFiles(file).subscribe(
      response => {
        console.log('Files uploaded successfully', response);
        console.log(response[0].id)
        if (response && response[0].id) {
          this.contractForm.get('signature.id')?.setValue(response[0].id);
        }
      },
      error => {
        console.error('Error uploading files', error);
      }
    );
  }

  private dataURLtoFile(dataURL: string, fileName: string): File {
    const arr = dataURL.split(',');
    // @ts-ignore
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, {type: mime});
  }

  protected readonly ContractStatus = ContractStatus;


  cancel(event: Event) {
    event.preventDefault();
  }


  selectedContract: any;

  selectContract(contract: any) {
    this.selectedContract = contract;
  }

  onFileSelected($event: Event) {
    // @ts-ignore
    const file: File = event.target.files[0];
    this.contractService.uploadContract(file).subscribe(
      response => {
        if (response && response[0].id)
          this.contractForm.get('content.id')?.setValue(response[0].id)
      },
      error => {
        console.error('Error uploading file', error);
      }
    );
  }

  onSubmit(): void {
    if (this.contractForm.valid) {
      const contractDto = this.contractForm.value;
      this.contractService.addContract(contractDto).subscribe({
        next: res => {
          console.log(res);
        },
        error: err => {
          console.log(err);

        }
      })
      // Pass the contractDto object to your API or perform any desired action
    }
  }

  saveContract(event: Event) {
    // @ts-ignore
    event.preventDefault();
    if (this.contractForm.valid) {
      const contractDto = this.contractForm.value;
      console.log(contractDto);
      this.contractService.addContract(contractDto).subscribe({
        next: res => {
          console.log(res);
          alert("contract added")
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        },
        error: err => {
          console.log(err);

        }
      })
      // Pass the contractDto object to your API or perform any desired action
    }
  }

  onDelete(id: string) {
    const url = 'http://localhost:8080/api/contracts/'
    this.http.delete(`http://localhost:8080/api/contracts/${id}`).subscribe({
      next: res => {
        // window.location.reload()
        this.contractService.getContracts().subscribe({
          next: res => {
            console.log(res);
            this.contractsData = res;
            console.log(this.contractsData);
          }, error: err => {
            console.log(err);
          }
        })
      }
    })
  }
}
