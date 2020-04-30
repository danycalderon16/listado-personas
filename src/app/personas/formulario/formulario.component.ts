import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Persona } from '../../persona-model';
import { LoggignService } from '../../LoggingService.service';
import { PersonasService } from '../../personas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']

})
export class FormularioComponent implements OnInit {
  // @Output() personaCreada = new EventEmitter<Persona>();
  nombreInput:string;
  apellidoInput:string;
  index:number;
  modoEdicion:number;

  // @ViewChild('nombreInput') nombreInput:ElementRef;
  // @ViewChild('apellidoInput') apellidoInput:ElementRef;

  constructor(
    private loggingService:LoggignService,
    private personasService:PersonasService,
    private router:Router,
    private route:ActivatedRoute) {
      this.personasService.saludar.subscribe(
        (indice: number) => alert( "El indice es:"+(indice+1) )
      );
    }

  ngOnInit(): void {
    this.index = this.route.snapshot.params['id'];
this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion'];
    if(this.modoEdicion != null && this.modoEdicion === 1){
      let persona = this.personasService.encontrarPersona(this.index);
      this.nombreInput = persona.nombre;
      this.apellidoInput = persona.apellido;
    }

  }

  onGuardarPersona(){
    let persona1 = new Persona(this.nombreInput,this.apellidoInput);
    // this.loggingService.enviaMensajeAConsola("Enviamos Persona: "+persona1.nombre+" "+persona1.apellido);
    // this.personaCreada.emit(persona1);
    if (this.modoEdicion != null && this.modoEdicion === 1)
      this.personasService.modificarPersona(this.index,persona1);
    else
      this.personasService.onPersonaAgregada(persona1);
    this.router.navigate(['personas']);
  }

  eliminarPersona(){
    if (this.modoEdicion != null && this.modoEdicion === 1){
      this.personasService.eliminarPersona(this.index);
    }
    this.router.navigate(['personas']);
  }

}
