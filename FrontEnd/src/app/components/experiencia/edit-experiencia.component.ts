import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit {
  expLab : Experiencia = null;

  constructor(private sExperiencia: ExperienciaService, private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sExperiencia.detail(id)
      .subscribe(
        {
          next: data => {
            this.expLab = data;
          },
          error: err => {
            alert('Error al Editar Experiencia');
            this.router.navigate(['']);
          }
        });
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sExperiencia.update(id, this.expLab)
    .subscribe(
      {
        next: data => {
          alert("Experience Edited Successfully!");
          this.router.navigate(['']);
        },
        error: err => {
          alert('Error Editing Experience!');
          this.router.navigate(['']);
      }
      });
  }
}
