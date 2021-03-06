import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestIdInputComponent } from './pages/quest-id-input-page/quest-id-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatFormFieldModule,
  MatInputModule, MatDialogModule, MatListModule, MatSelectModule,
  MatOptionModule, MatRadioModule, MatIconModule } from '@angular/material';
import { QuestionnairePageComponent } from './pages/questionnaire-page/questionnaire-page.component';
import { ErrorDialogPopupComponent } from './components/error-dialog-popup/error-dialog-popup.component';
import { TextCardComponent } from './components/text-card/text-card.component';
import { QuestionBlockComponent } from './components/question-block/question-block.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResultsPageComponent } from './pages/results-page/results-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FooditemComponent } from './pages/fooditem/fooditem.component';
import { ReactiveFormsModule} from '@angular/forms';
import { AdminHeaderComponent } from './pages/admin-header/admin-header.component';
import { QuestResultsComponent } from './pages/quest-results/quest-results.component';
import { RecommendComponent } from './pages/recommend/recommend.component';
import { PopupComponent } from "./components/popup/popup.component";
import { DeletePopupComponent } from "./components/delete-popup/delete-popup.component";
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Routes, RouterModule } from '@angular/router';
import { RecommendModalComponent } from './components/recommend-modal/recommend-modal.component';
import { FoodRecommendModalComponent } from './components/food-recommend-modal/food-recommend-modal.component';
import { ClinicalPortalComponent } from './pages/clinical-portal/clinical-portal.component';
import { ClinicalHeaderComponent } from './pages/clinical-header/clinical-header.component';
import { ParentalHeaderComponent } from './pages/parental-header/parental-header.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
//import { JwtInterceptor } from './services/authentication/jwt.interceptor';
//import { fakeBackendProvider } from './services/authentication/temp-backend';
import { RecommendParentalComponent } from './pages/recommend-parental/recommend-parental.component';
import { TrackerPageComponent } from './pages/tracker-page/tracker-page.component';
import { TrackerBlockComponent } from './components/tracker-block/tracker-block.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TrackerHistoryPageComponent } from './pages/tracker-history-page/tracker-history-page.component';
import { HistoryParentalComponent } from './pages/history-parental/history-parental.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginComponent } from './pages/login';
import { LoginHeaderComponent } from './pages/login-header';
import { ClinicQuestResultsComponent } from './pages/clinic-quest-results';
import { ClinicRecommendComponent } from './pages/clinic-recommend';
import { AdminUsersComponent } from './pages/admin-users';
import { UserComponent } from './pages/user/user.component';
import { ClinicUserComponent } from './pages/clinic-user/clinic-user.component';
import { AdminClinicsComponent } from './pages/admin-clinics/';
import { ClinicComponent } from './pages/clinic/clinic.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ClinicianPipe } from './pipes/clinicianFilter.pipe';
import { ParentPipe } from './pipes/parentFilter.pipe';
import { PatientPipe } from './pipes/patientFilter.pipe';
import { SearchPipe } from './pipes/searchFilter.pipe';
import { ResultsPipe } from './pipes/resultsFilter.pipe';
import { ClinicTrackerHistoryComponent } from './pages/clinic-tracker-history/clinic-tracker-history.component';
import { TrackerFilterPipe } from './pipes/tracker-filter.pipe';
import { RecommendedFilterPipe } from './pipes/recommended-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    QuestIdInputComponent,
    QuestionnairePageComponent,
    ErrorDialogPopupComponent,
    TextCardComponent,
    QuestionBlockComponent,
    ResultsPageComponent,
    AdminPageComponent,
    FooditemComponent,
    AdminHeaderComponent,
    QuestResultsComponent,
    RecommendComponent,
    PopupComponent,
    RecommendModalComponent,
    FoodRecommendModalComponent,
    ClinicalPortalComponent,
    ClinicalHeaderComponent,
    ParentalHeaderComponent,
    LoginPageComponent,
    RecommendParentalComponent,
    TrackerPageComponent,
    TrackerBlockComponent,
    TrackerHistoryPageComponent,
    HistoryParentalComponent,
    LoginComponent,
    LoginHeaderComponent,
    ClinicQuestResultsComponent,
    ClinicRecommendComponent,
    AdminUsersComponent,
    UserComponent,
    ClinicUserComponent,
    AdminClinicsComponent,
    ClinicComponent,
    LogoutComponent,
    ClinicianPipe,
    ParentPipe,
    PatientPipe,
    SearchPipe,
    ResultsPipe,
    DeletePopupComponent,
    ClinicTrackerHistoryComponent,
    TrackerFilterPipe,
    RecommendedFilterPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgbModule.forRoot(),
    FlashMessagesModule.forRoot(),
   ],

  bootstrap: [AppComponent],
  entryComponents: [
    ErrorDialogPopupComponent,
    ResultsPageComponent,
    PopupComponent,
    RecommendModalComponent,
    FoodRecommendModalComponent,
    DeletePopupComponent
  ]
})
export class AppModule { }