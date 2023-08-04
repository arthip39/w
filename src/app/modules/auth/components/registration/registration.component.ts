import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject, Observable, of } from 'rxjs';
import { IRegistrationForm, inits } from './registration.interface';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorMessage } from 'src/app/models/error-message.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  formsCount = 8;
  account$: BehaviorSubject<IRegistrationForm> =
    new BehaviorSubject<IRegistrationForm>(inits);
  currentStep$: BehaviorSubject<number> = new BehaviorSubject(1);
  isCurrentFormValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private unsubscribe: Subscription[] = [];
  IregisterAccount: IRegistrationForm[] = [];

  constructor(
    private alertService: AlertService,
    private registerService: RegisterService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  updateAccount = (part: Partial<IRegistrationForm>, isFormValid: boolean) => {
    const currentAccount = this.account$.value;
    const updatedAccount = { ...currentAccount, ...part };
    this.account$.next(updatedAccount);
    this.isCurrentFormValid$.next(isFormValid);
  };

  //nextStep function called when click continue or submit button
  nextStep() {
    const nextStep = this.currentStep$.value + 1;
    if (nextStep >= this.formsCount) {
      // do any additional tasks here that need to be done when the user submits the form
      this.registerAccount()
      console.log("Form submitted!");
      return;

    }
    this.currentStep$.next(nextStep);
  }

  prevStep() {
    const prevStep = this.currentStep$.value - 1;
    if (prevStep === 0) {
      return;
    }
    this.currentStep$.next(prevStep);
  }

  //call registration function form register.service.ts
  registerAccount() {
    const registerForm = this.account$.value;
    this.registerService.registration(registerForm).pipe(
      map(() => {
        this.alertService.onSuccess('Successfully Create your Account', '/auth/login');
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('error', error);
        const errorMessage = error.error.message || 'An error occurred while register.';
        this.alertService.withOutTranslate.onError(errorMessage);
        return of(false);
      })      
    ).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }



  // registrationForm: FormGroup;
  // hasError: boolean;
  // isLoading$: Observable<boolean>;

  // // private fields
  // private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // constructor(
  //   private fb: FormBuilder,
  //   private authService: AuthService,
  //   private router: Router
  // ) {
  //   this.isLoading$ = this.authService.isLoading$;
  //   // redirect to home if already logged in
  //   if (this.authService.currentUserValue) {
  //     this.router.navigate(['/']);
  //   }
  // }

  // ngOnInit(): void {
  //   this.initForm();
  // }

  // // convenience getter for easy access to form fields
  // get f() {
  //   return this.registrationForm.controls;
  // }

  // initForm() {
  //   this.registrationForm = this.fb.group(
  //     {
  //       fullname: [
  //         '',
  //         Validators.compose([
  //           Validators.required,
  //           Validators.minLength(3),
  //           Validators.maxLength(100),
  //         ]),
  //       ],
  //       email: [
  //         'qwe@qwe.qwe',
  //         Validators.compose([
  //           Validators.required,
  //           Validators.email,
  //           Validators.minLength(3),
  //           Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
  //         ]),
  //       ],
  //       password: [
  //         '',
  //         Validators.compose([
  //           Validators.required,
  //           Validators.minLength(3),
  //           Validators.maxLength(100),
  //         ]),
  //       ],
  //       cPassword: [
  //         '',
  //         Validators.compose([
  //           Validators.required,
  //           Validators.minLength(3),
  //           Validators.maxLength(100),
  //         ]),
  //       ],
  //       agree: [false, Validators.compose([Validators.required])],
  //     },
  //     {
  //       validator: ConfirmPasswordValidator.MatchPassword,
  //     }
  //   );
  // }

  // submit() {
  //   this.hasError = false;
  //   const result: {
  //     [key: string]: string;
  //   } = {};
  //   Object.keys(this.f).forEach((key) => {
  //     result[key] = this.f[key].value;
  //   });
  //   const newUser = new UserModel();
  //   newUser.setUser(result);
  //   const registrationSubscr = this.authService
  //     .registration(newUser)
  //     .pipe(first())
  //     .subscribe((user: UserModel) => {
  //       if (user) {
  //         this.router.navigate(['/']);
  //       } else {
  //         this.hasError = true;
  //       }
  //     });
  //   this.unsubscribe.push(registrationSubscr);
  // }

  // ngOnDestroy() {
  //   this.unsubscribe.forEach((sb) => sb.unsubscribe());
  // }
}
