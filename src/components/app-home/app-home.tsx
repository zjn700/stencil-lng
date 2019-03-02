import { Component } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <p>
          Welcome to the PWA Toolkit. You can use this starter to build entire
          apps with web components using Stencil and ionic/core! Check out the
          README for everything that comes in this starter out of the box and
          check out our docs on <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>
        <ion-grid fixed>

          <ion-button href="/profile/ionic" expand="block">Profile page</ion-button>
          {/* <ion-button href="/profile-dupe/Krika" expand="block">Profile Dupe page</ion-button>
          <ion-button href="/dictionary" expand="block">Dictionary</ion-button> */}
          <ion-button href="/login" expand="block">Login</ion-button>
        </ion-grid>
      </ion-content>
    ];
  }
}
