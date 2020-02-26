import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'location',
    loadChildren: './location/location.module#LocationPageModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'signin',
    loadChildren: './signin/signin.module#SigninPageModule'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'lhome',
    loadChildren: './lhome/lhome.module#LhomePageModule'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfilePageModule'
  },
  {
    path: 'testmap',
    loadChildren: './testmap/testmap.module#TestmapPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signin/:name', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'location/:sid', loadChildren: './location/location.module#LocationPageModule' },
  { path: 'lhome', loadChildren: './lhome/lhome.module#LhomePageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'testmap', loadChildren: './testmap/testmap.module#TestmapPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
