import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) {
  }


  // addSignature(signature: any) {
  //   this.http.post("http://localhost:8080/api/upload-files?accepted-extension=ANY", signature)
  // }

  uploadFiles(files: File): Observable<Object> {
    const url = 'http://localhost:8080/api/upload-files?accepted-extension=ANY';
    const formData: FormData = new FormData();

    formData.append('file', files, files.name);

    // Make HTTP POST request
  return this.http.post(url, formData);
  }

}
