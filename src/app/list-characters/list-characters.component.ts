import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { MarvelapiService } from '../service/marvel/marvelapi.service';
import { SharedService } from '../service/shared/shared.service';



@Component({
  selector: 'app-list-characters',
  templateUrl: './list-characters.component.html',
  styleUrls: ['./list-characters.component.css']
})

export class ListCharactersComponent implements OnInit {
  Characters: Observable<any>; //Vetor de personagens a ser exibido, sendo buscado 100 por vez
  totalCharacters: Observable<any>; //Número total de personagens disponíveis de acordo com o filtro
  isAllCharacters: boolean = true; //Verdadeiro = lista de todos os personagens; falso = há um filtro
  currentPage: number = 1; // Página atual
  totalPages: number; //Número total de páginas disponíveis de acordo com o filtro
  startsWith :string; //Armazena a string anteriormente buscada
  
  
  constructor(private marvelService: MarvelapiService, private sharedService:SharedService) { 
    
  }
  //Inicia o componente mostrando todos os personagens e subscreve no observer que liga a listagem
  //de personagens a barra de navegação
  ngOnInit(): void {
    this.isAllCharacters = true;
    this.sharedService.currentMessage$.subscribe((result) => this.seachEvent(result));
    this.totalCharacters = this.marvelService.getAllCharactersTotal();
    this.chargePage(1)
    this.getTotalPages();
  
  }

  //Define os valores para as propriedes caso seja feita uma busca e atualiza a página para atender
  //aos filtros
  seachEvent(result:any){
    this.startsWith = result;
    this.isAllCharacters = false;
    this.chargePage(1);
    this.totalCharacters = this.marvelService.getCharactersStartsWithTotal(result);
    this.getTotalPages();

  }
 

  //Calcula o número de páginas de acordo com a quantidade de personagens disponíveis
  async getTotalPages(){
    let numPesonagens = await this.totalCharacters.toPromise();
    if(numPesonagens%20 == 0){
      this.totalPages = Math.floor(numPesonagens/100);
    }else{
      this.totalPages = Math.floor(numPesonagens/100)+1;
    }
    
  }

  //Faz a mudança da página de acordo com parâmetro "page", que é a página desejada. É utilizada
  //no clique dos botões "<<", "<", ">", ">>"
  chargePage(page:number){
    this.currentPage = page;
    if(this.isAllCharacters){
      this.Characters = this.marvelService.getAllCharacters(page);
    }else{
      this.Characters= this.marvelService.getCharactersStartsWith(page, this.startsWith)
    }
  }
}
