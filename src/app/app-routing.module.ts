import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScaffoldOneComponent } from './layouts/scaffold-one/scaffold-one.component';
import { authGuard } from './core/guards/auth.guard';

// TODO: add 404 page :)
const routes: Routes = [
  // TODO: this should be home page later
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: 'home',
    component: ScaffoldOneComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/suppliers/suppliers.module').then(
            (m) => m.SuppliersModule
          ),
      },
      {
        path: 'activities',
        loadChildren: () =>
          import('./pages/suppliers/suppliers.module').then(
            (m) => m.SuppliersModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/suppliers/suppliers.module').then(
            (m) => m.SuppliersModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    loadChildren: () => import('./pages/no-page/no-page.module').then((m) => m.NoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
