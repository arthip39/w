import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslationService } from '../modules/i18n/translation.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private translate: TranslationService,
    private router: Router, 
    private userService: UserService
    ) {}

    onSuccess(message: string, navigateTo?: string) {
      Swal.fire({
        title: 'Success!',
        text: message,
        icon: 'success',
        confirmButtonText: 'Okay',
      }).then(() => {

        this.router.navigate([navigateTo]);

      });
    }

  onError(messageCode: string) {
    Swal.fire({
      title: 'Error!',
      text: this.translate.get(messageCode),
      icon: 'error',
      confirmButtonText: this.translate.get('BUTTON.OK'),
    });
  }

  onWarning(messageCode: string) {}
  

  withOutTranslate = {
    onSuccess(message: string) {
      Swal.fire({
        title: 'Success!',
        text: message,
        icon: 'success',
        confirmButtonText: 'Okay',
      });
    },

    onError(message: string) {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    },

    onWarning(message: string) {},
  };

  
}
