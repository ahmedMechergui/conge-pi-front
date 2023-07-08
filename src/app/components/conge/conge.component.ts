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
   this.congeService.getConge().subscribe(res=>{
    console.log('aaaaaaaaaaaa' , res)
    this.conges = res
   })
    
  }

  postConge() {
    console.log(this.conge)
    this.congeService.postConge(this.conge).subscribe(res => {
      Swal.fire(
        'Bien  !',
        'Vous avez ajouté un congé !',
        'success'
      ).then(a => {
        this.getAllConge()
      })
    })
  }

  showConge(i: any) {
    this.conge = i
    console.log("conge", this.conge)

  }

  editConge() {
    console.log(this.conge)
    this.congeService.editConge(this.conge).subscribe(res => {
      Swal.fire(
        'Bien  !',
        'Vous avez modifé un congé !',
        'success'
      ).then(a => {
        this.getAllConge()
      })
    })
  }

  showDelete(i: any) {
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
        this.congeService.deleteConge(i.id).subscribe(res=>{

          Swal.fire(
            'Supprimé !',
            'Votre fichier a été supprimé.',
            'success'
          ).then(a => {
            this.getAllConge()
          })
        })
      }
    });

  }

  showCheck(i: any) {
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
        i.decision = true
        this.congeService.acceptConge(i).subscribe(res=>{

          Swal.fire(
            'Supprimé !',
            'Votre fichier a été modifié.',
            'success'
          ).then(a => {
            this.getAllConge()
          })
        })
      }
    });
  }

}
