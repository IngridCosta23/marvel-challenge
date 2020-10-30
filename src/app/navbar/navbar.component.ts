import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


import { ListCharactersComponent } from '../list-characters/list-characters.component';
import { MarvelapiService } from '../service/marvel/marvelapi.service';
import { SharedService } from '../service/shared/shared.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
//Barra de navegação com formulário de busca
export class NavbarComponent implements OnInit {
  seachInput: any;
  message: string;

  
  constructor(private sharedService: SharedService, private route: Router) { 

  }
  
  
  ngOnInit(): void {
    this.seachInput = document.getElementById("seach-text");
    
  }
  
  //Modifica o valor do subject no service caso haja algo escrito na caixa 
  seachCharacterStartsWith(){
    if(this.seachInput.value!=""){
    this.sharedService.changeMessage(this.seachInput.value);
    }
  }
  

}
