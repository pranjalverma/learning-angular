import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { AuthGuardService } from './services/authguard-service/auth-guard.service';
import { UserFormWrapperComponent } from './user-form-wrapper/user-form-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'product/:productId',
    component: ProductPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'signup',
    component: UserFormWrapperComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
