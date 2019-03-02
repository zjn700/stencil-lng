import { Component, Listen } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {


  // @Prop({ connect: 'ion-toast-controller' })
  // toastCtrl: HTMLIonToastControllerElement;

  @Listen("window:swUpdate")
  async onSWUpdate() {
    const registration = await navigator.serviceWorker.getRegistration();

    if (!registration || !registration.waiting) {
      // If there is no registration, this is the first service
      // worker to be installed. registration.waiting is the one
      // waiting to be activiated.
      return;
    }

    // const toast = await this.toastCtrl.create({
    //   message: "New version available",
    //   showCloseButton: true,
    //   closeButtonText: "Reload"
    // });

    // await toast.present();
    // await toast.onWillDismiss();

    // registration.waiting.postMessage("skipWaiting");
    // window.location.reload();
  }


  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/profile/:name" component="app-profile" />
          {/* <ion-route url="/profile-dupe/:name" component="app-profile-dupe" />
          <ion-route url="/dictionary" component="app-dictionary" /> */}
          <ion-route url="/login" component="auth-service" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
