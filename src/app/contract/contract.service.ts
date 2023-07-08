import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) {
  }


  uploadFiles(signImage: File): Observable<any> {
    const url = 'http://localhost:8080/api/upload-files?accepted-extension=ANY';
    const files: FormData = new FormData();

    files.append('files', signImage, signImage.name);

    return this.http.post(url, files);
  }

  uploadContract(file: File): Observable<any> {
    const url = 'http://localhost:8080/api/upload-files?accepted-extension=ANY'; // Replace with your actual upload URL

    // Create a FormData object
    const formData: FormData = new FormData();
    formData.append('files', file, file.name); // Append the file to the FormData

    // Make the HTTP POST request
    return this.http.post(url, formData);
  }

  addContract(contract: any) {
    const url = 'http://localhost:8080/api/contracts';
    return this.http.post(url, contract)
  }

  getContracts() {
    const url = 'http://localhost:8080/api/contracts';
    return this.http.get(url)
  }

}
