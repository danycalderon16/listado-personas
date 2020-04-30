import { Persona } from './persona-model';
import { LoggignService } from './LoggingService.service';
import { Injectable, EventEmitter } from '@angular/core';
import { DataServices } from './data.services';

@Injectable()
export class PersonasService {

  personas: Persona[] = [];

  saludar = new EventEmitter<number>();
  constructor(private logginSErvice: LoggignService,
    private dataService: DataServices) { }


  setPersonas(personas:Persona[]){
    this.personas = personas;
  }
  obtenerPersonas() {
    return this.dataService.cargarPersonas();
  }

  onPersonaAgregada(persona: Persona) {
    this.logginSErvice.enviaMensajeAConsola("Agragamos Persona " + persona.nombre)
    if(this.personas== null){
      this.personas = [];
    }
    this.personas.push(persona);
    this.dataService.guardarPersonas(this.personas);
  }

  encontrarPersona(index: number) {
    let persona: Persona = this.personas[index];
    return persona;
  }

  modificarPersona(index: number, persona: Persona) {
    let persona1 = this.personas[index];
    persona1.nombre = persona.nombre;
    persona1.apellido = persona.apellido;
    this.dataService.modificarPersona(index,persona);
  }

  eliminarPersona(index: number) {
    this.personas.splice(index, 1);
    this.dataService.eliminarPersona(index);
    //se vueve a guardar el arregle
    this.modificarPersonas();
  }

  modificarPersonas(){
    if(this.personas!= null){
      this.dataService.guardarPersonas(this.personas);
    }
  }

}
