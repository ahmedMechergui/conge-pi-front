import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CongeService {

  constructor(
    private http : HttpClient
  ) { }

  data = [
    {
      employe: "jean wick",
      dateDebut: "07-07-2023",
      dateFin:"07-07-2023",
      decision: false ,
      nbrjours: 31 ,
      typeConge:"SANS_SOLDE" , 
      employee: "jean wick"
    },
    {
      employe: "leo di caprio",
      dateDebut: "07-07-2023",
      dateFin:"07-07-2023",
      decision: false ,
      nbrjours: 31 ,
      typeConge:"MATERNITE" , 
      employee: "jean wick"
    },
  ]

  getConge() {
    return this.data
  }

  editConge(data : any){
    return this.http.put('http://localhost:8090/api/conge/'+data.id , data)
  }

  postConge(data : any){
    return this.http.post('http://localhost:8090/api/conge' , data)
  }

  deleteConge(id : any){
    return this.http.delete('http://localhost:8090/api/conge'+id)
  }
}
