import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
//Obtem os dados da API da Marvel
export class MarvelapiService {

  PUBLIC_KEY = "44a95f255452238838ebe33b932a7571";
  HASH = "d6f9c2caa7efc637349695ce1a5e2186"; //hash sintetizado por MD5 com ts+privateKey+publicKey (ts = 1)
  URL_API = `http://gateway.marvel.com/v1/public/characters?`;


  constructor(private httpClient: HttpClient) {
    
  }

  //Obtem a lista com todos os personagens
   getAllCharacters(page:number): Observable<any>{
      var URL_API_ofPage = `${this.URL_API}limit=100&offset=${(page-1)*100}&ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`
      return this.httpClient.get<any>(URL_API_ofPage).pipe(map((data:any)=>data.data.results));
   }
  //Obtem a quantidade total de personagens
   getAllCharactersTotal(): Observable<any>{
   var URL_API = `${this.URL_API}ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;
    return (this.httpClient.get<any>(URL_API).pipe(map((data:any)=>data.data.total)));
   }
  //Obtem o total de personagens filtrando de acordo com o nome
   getCharactersStartsWithTotal(nameStartsWith:string):Observable<any>{
    var URL_API_ofPage = `${this.URL_API}&nameStartsWith=${nameStartsWith}&ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`
    return this.httpClient.get<any>(URL_API_ofPage).pipe(map((data:any)=>data.data.total));
   }
   //Obtem a lista de personagens filtrando pelo começo do nome
  getCharactersStartsWith(page:number, nameStartsWith:string): Observable<any>{
    var URL_API_ofPage = `${this.URL_API}limit=100&offset=${(page-1)*100}&nameStartsWith=${nameStartsWith}&ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`
    return this.httpClient.get<any>(URL_API_ofPage).pipe(map((data:any)=>data.data.results));
  }
  

}
