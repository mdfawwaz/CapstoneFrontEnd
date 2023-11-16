import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './loginpage/loginpage.component';
import { RegistrationPageComponent } from './registrationpage/registrationpage.component';
import { LocationComponent } from './location/location.component';
import { SelectPageComponent } from './select-page/select-page.component';
import { ProductSelectionComponent } from './product-selection/product-selection.component';
import { AuthGuard } from './auth.guard';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ProductDetailsDialogComponent } from './product-details-dialog/product-details-dialog.component';
import { BillingComponent } from './billing/billing.component';

const routes: Routes = [
  { path: 'register', component: RegistrationPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'selectpage', component: SelectPageComponent,canActivate: [AuthGuard] },
  { path: 'location', component: LocationComponent,canActivate: [AuthGuard] },
  { path: 'productselection', component: ProductSelectionComponent },
  { path: 'product-details/:id', component: ProductDetailsDialogComponent,canActivate: [AuthGuard] },
  { path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuard] },
  { path: 'billing', component: BillingComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/selectpage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

