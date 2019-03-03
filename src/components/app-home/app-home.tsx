import { Component, Listen, State } from '@stencil/core';
import { var1, var2, authUser, getAuthUser } from '../../shared/state';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  @State() reRender: boolean = false
  @State() authUser
  @Listen('authStateChanged')
  authStateChangedHandler(event: CustomEvent) {
    console.log('Received the custom todoCompleted event: ', event.detail);
    this.reRender = !this.reRender
    console.log(this.reRender)

  }

  componentWillLoad() {
    console.log(var1, var2)
    console.log('will load', authUser)
    this.doThis()
    this.authUser = getAuthUser();
    // setUserVal('z')
  }
  componentWillUpdate() { console.log('will update', authUser) }
  componentDidLoad() { console.log('did load', authUser) }
  componentDidUpdate() { console.log('did update', authUser) }
  componentDidUnload() { console.log('did unload', authUser) }

  doThis() { console.log("get auth user", getAuthUser().displayName) }

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
          <h1>{getAuthUser().displayName}</h1>

          <ion-button href="/profile/ionic" expand="block">Profile page</ion-button>
          {/* <ion-button href="/profile-dupe/Krika" expand="block">Profile Dupe page</ion-button>
          <ion-button href="/dictionary" expand="block">Dictionary</ion-button> */}
          <ion-button href="/login" expand="block">Login</ion-button>
        </ion-grid>
      </ion-content>
    ];
  }
}
