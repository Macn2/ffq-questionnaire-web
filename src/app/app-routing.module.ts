import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { QuestionnairePageComponent } from "./pages/questionnaire-page/questionnaire-page.component";
import { QuestIdInputComponent } from "./pages/quest-id-input-page/quest-id-input.component";
import { AdminPageComponent } from "./pages/admin-page/admin-page.component";
import { ResearchPageComponent } from "./pages/research-page/research-page.component";
import { FooditemComponent } from "./pages/fooditem/fooditem.component";
import { QuestResultsComponent } from "./pages/quest-results/quest-results.component";
import { RecommendComponent } from "./pages/recommend/recommend.component";
import { ClinicalPortalComponent } from "./pages/clinical-portal/clinical-portal.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { AuthGuard } from "./services/authentication/auth.guard";
import { RecommendParentalComponent } from "./pages/recommend-parental/recommend-parental.component";
import { TrackerPageComponent } from "./pages/tracker-page/tracker-page.component";
import { TrackerHistoryPageComponent } from "./pages/tracker-history-page/tracker-history-page.component";
import { HistoryParentalComponent } from "./pages/history-parental/history-parental.component";
import { LoginComponent } from "./pages/login";
import { LoginHeaderComponent } from "./pages/login-header";
import { ClinicQuestResultsComponent } from "./pages/clinic-quest-results";
import { ClinicRecommendComponent } from "./pages/clinic-recommend";
import { AdminUsersComponent } from "./pages/admin-users";
import { UserComponent } from "./pages/user/user.component";
import { ClinicUserComponent } from "./pages/clinic-user/clinic-user.component";
import { AdminClinicsComponent } from "./pages/admin-clinics";
import { ClinicComponent } from "./pages/clinic/clinic.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { LogoutComponent } from "./pages/logout/logout.component";
import { ClinicTrackerHistoryComponent } from "./pages/clinic-tracker-history/clinic-tracker-history.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "admin/home",
    pathMatch: "full",
  },
  {
    path: "*",
    redirectTo: "login",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "logout",
    component: LogoutComponent,
  },
  {
    path: "login-page",
    component: LoginPageComponent,
  },
  {
    path: "admin/fooditem/:id",
    component: FooditemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/fooditem",
    component: FooditemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/user/:type/:id",
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/user/:id",
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/home",
    component: AdminPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/users",
    component: AdminUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/results",
    component: QuestResultsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/recommend",
    component: RecommendComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/clinics",
    component: AdminClinicsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/clinic",
    component: ClinicComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin/clinic/:id",
    component: ClinicComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "clinic/results",
    component: ClinicQuestResultsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "clinic/recommend",
    component: ClinicRecommendComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "clinic/user/:type/:id",
    component: ClinicUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "clinic/user",
    component: ClinicUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "clinic/tracker-history",
    component: ClinicTrackerHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "clinic/home",
    component: ClinicalPortalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "parent/home",
    component: QuestIdInputComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "parent/questionnaire/:id",
    component: QuestionnairePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "parent/tracker",
    component: TrackerPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "parent/tracker-history",
    component: TrackerHistoryPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "parent/history",
    component: HistoryParentalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "parent/recommend",
    component: RecommendParentalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "research/home",
    component: ResearchPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
