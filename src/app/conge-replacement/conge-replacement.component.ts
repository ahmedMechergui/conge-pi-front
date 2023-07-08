import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-conge-replacement',
  templateUrl: './conge-replacement.component.html',
  styleUrls: ['./conge-replacement.component.css']
})
export class CongeReplacementComponent implements OnInit {

  formData: any = {};
  form?: NgForm;
  replacementRequests: any[] = [];

  constructor(private http:HttpClient,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.getReplacementRequests()
  }

  getReplacementRequests(){
    this.http.get('http://localhost:8080/api/replacements/requests').subscribe((requests:any) => {
      this.replacementRequests = requests;
      this.replacementRequests.forEach(request => {
        request.employeeImg = 'assets/images/users/'+this.getRandomNumber()+'.jpg'
        request.replacementImg = 'assets/images/users/'+this.getRandomNumber()+'.jpg'
      })
      console.log(requests)
    },error => {
      console.log(error)
    })
  }


  getRandomNumber(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  onSubmit(form: NgForm) {
    this.form = form;
    const formData = form.value
    // Map the form data to the desired JSON structure
    const requestPayload = {
      position: formData.poste,
      period: {
        startDate: formData.dateDebut,
        endDate: formData.dateFin
      },
      replacedEmployee: { id: formData.idEmployee },
      replacement: { replacedBy: { id: formData.idReplacement } },
      skills: formData.competences
    };

    // Send the POST request
    this.http.post('http://localhost:8080/api/replacements/requests', requestPayload)
      .subscribe(
        (response) => {
          console.log('Request sent successfully:', response);
          this.form?.reset()
          this.getReplacementRequests()
          this.showSuccess()
        },
        (error) => {
          console.error('Error sending the request:', error);
        }
      );
  }

  public showSuccess(): void {
    this.toaster.success('Demande de remplacement ajouté', 'Success!', {positionClass:'toast-bottom-right'});
  }

  onDelete(id:number) {
    this.replacementRequests = this.replacementRequests.filter(request => request.id !== id);
    this.http.delete('http://localhost:8080/api/replacements/requests/'+id).subscribe()
  }

  onUpdate(request:any) {
    console.log(request);
      this.formData.idEmployee = request.replacedEmployee.id;
      this.formData.idReplacement = request.replacement.replacedBy.id;
      this.formData.dateDebut = request.period.startDate;
      this.formData.dateFin = request.period.endDate;
      this.formData.competences = request.skills;
      this.formData.poste = request.position;
      this.formData.notes = 'Notes sur remplacement';
  }

  clearForm(){
    this.formData = {}
  }
}
