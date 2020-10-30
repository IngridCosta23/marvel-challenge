import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  messageSource = new Subject();
  public currentMessage$ = this.messageSource.asObservable();

  constructor() { }
  
  //Compartilha a entrada da pesquisa na barra de navegação com a listagem de personagens
  changeMessage(startsWith: string){
    this.messageSource.next(startsWith);
  }


}


