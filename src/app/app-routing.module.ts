import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCharactersComponent } from './list-characters/list-characters.component';

const routes: Routes = [{path:"list",component:ListCharactersComponent},
{
  path: '',
  pathMatch: 'full',
  redirectTo: 'list'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
