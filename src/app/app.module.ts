import { StorageService } from './services/storage.service';
import { LoaderService } from './services/loader.service';
import { NgModule, APP_INITIALIZER, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// #fake-start#
import { ToastrModule } from 'ngx-toastr';
import { ErrorCatchingInterceptor } from './helpers/error-catching.interceptor';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {
  DEFAULT_TIMEOUT,
  TimeoutInterceptor,
} from './helpers/timeout.interceptor';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
// import { GridModule } from '@progress/kendo-angular-grid';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './pages/contact/contact.component';


import { ApplicantsComponent } from './pages/master/branch/applicants/applicants.component';

// #fake-end#

function appInitializer(userService: UserService) {
  return () => {
    return new Promise((resolve) => {
      // @ts-ignore
      userService.getUserProfile().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent, ContactComponent,],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
    }),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),

    HttpClientModule,
    ClipboardModule,
    // #fake-start#
    // environment.isMockEnabled
    //   ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
    //       passThruUnknownUrl: true,
    //       dataEncapsulation: false,
    //     })
    //   : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    DropDownsModule,
    // GridModule,
    CommonModule,
  ],
  providers: [
    {
      provide: LocationStrategy, 
      useClass: HashLocationStrategy
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [UserService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 10000 }],
    AuthService,
    AlertService,
    LoaderService,
    StorageService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
