import { Component, OnInit } from '@angular/core';
import { CongeService } from 'src/app/services/conge.service';
import Swal from 'sweetalert2';

class Conge {
  employe: any
  dateDebut: any
  dateFin: any
  decision: any
  nbrjours: any
  typeConge: any
  employee: any
}

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit {
  conges: any
  conge = new Conge()
  constructor(
    private congeService: CongeService
  ) { }

  ngOnInit(): void {
    this.getAllConge()
  }

  getAllConge() {
    this.conges = this.congeService.getConge()
    console.log(this.conges)
  }

  postConge(){
    console.log(this.conge)
  }

  showConge(i:any){
    this.conge = i
    console.log("conge" , this.conge)
    
  }

  editConge(){
    console.log(this.conge)
  }

  showDelete(i:any){
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le !'
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Supprimé !',
          'Votre fichier a été supprimé.',
          'success'
        )
      }
    });
    
  }

  showCheck(i : any){
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, accepte-le !'
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Supprimé !',
          'Votre fichier a été supprimé.',
          'success'
        )
      }
    });
  }

}
