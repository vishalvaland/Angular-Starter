import { ProductComponent } from './product/product.component';
import { AuthGuardService } from './helpers/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
 
const routes: Routes = [   
      {
        path: '', redirectTo: 'home',pathMatch: 'full' ,canActivate: [AuthGuardService] 
      },
    {
        path: 'home',
        component: HomeComponent, 
        canActivate: [AuthGuardService]
    }, 
    {
      path: 'login',
      component: LoginComponent,       
    },
    {
      path: 'product',
      component: ProductComponent,  
      canActivate: [AuthGuardService]     
    },
    {
      path: 'register',
      component: SignupComponent,       
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
