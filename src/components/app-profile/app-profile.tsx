import { Component, Prop, State } from '@stencil/core';
import { sayHello } from '../../helpers/utils';
import { getAuthUser, authUser } from '../../shared/state';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css'
})
export class AppProfile {

  @State() hidden: boolean = false
  // @State() authUser: any
  @State() state = false;
  @Prop() name: string;
  // @Prop({ mutable: true }) @State() authUser: any
  @Prop({ mutable: true }) authUser: any
  // @State() authUser

  componentWillLoad() {
    this.authUser = getAuthUser("from profile will load")
    console.log("authUser this", this.authUser, "state authuser", authUser)
  }

  formattedName(): string {
    if (this.name) {
      return this.name.substr(0, 1).toUpperCase() + this.name.substr(1).toLowerCase();
    }
    return '';
  }

  render() {
    return [
      // <ion-header>
      //   <ion-toolbar color="primary">
      //     <ion-buttons slot="start">
      //       <ion-back-button defaultHref="/" />
      //     </ion-buttons>
      //     <ion-title>Profile 2: {getAuthUser().displayName} - {this.name}</ion-title>
      //   </ion-toolbar>
      // </ion-header>,
      <ion-header class={this.hidden ? "hidden" : "shown"}>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-button href="/main/dictionary" expand="block"><ion-icon name="arrow-back"></ion-icon></ion-button>
            {/* <ion-button href="/" expand="block">home</ion-button> */}
          </ion-buttons>
          <ion-title>Profile: {getAuthUser("profile render").displayName}</ion-title>

        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <p>
          {sayHello()}! My name is s {this.formattedName()}. My name was passed in through a
          route param!
        </p>

        <ion-item>
          <ion-label>Setting ({this.state.toString()})</ion-label>
          <ion-toggle
            checked={this.state}
            onIonChange={ev => (this.state = ev.detail.checked)}
          />
        </ion-item>

        <ion-item>
          <ion-label>Setting ({this.state.toString()})</ion-label>
          <ion-toggle
            checked={this.state}
            onIonChange={ev => (this.state = ev.detail.checked)}
          />
        </ion-item>
      </ion-content>
    ];
  }
}
