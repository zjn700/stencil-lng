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
    console.log('prof will load', this.authUser)
    // this.authUser = getAuthUser("from profile will load").loggedIn
    console.log("prof authUser prop this", this.authUser, "state var authuser", authUser)
  }
  componentWillUpdate() { console.log('prof will update', this.authUser) }
  componentDidLoad() { console.log('prof did load', this.authUser) }
  componentDidUpdate() { console.log('prof did update', this.authUser) }
  componentDidUnload() { console.log('prof did unload', this.authUser) }

  formattedName(): string {

    // this.name = this.authUser.displayName
    console.log("profile name formaat", this.name, this.authUser.displayName)
    if (this.authUser.displayName) {
      return this.authUser.displayName;
      // return this.authUser.displayName.substr(0, 1).toUpperCase() + this.name.substr(1).toLowerCase();
      // if (this.name) {
      //   return this.name.substr(0, 1).toUpperCase() + this.name.substr(1).toLowerCase();
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
            <ion-button href="/main" expand="block"><ion-icon name="arrow-back"></ion-icon></ion-button>
            {/* <ion-button href="/" expand="block">home</ion-button> */}
          </ion-buttons>
          <ion-title>Profile: {getAuthUser("profile render").details.displayName}</ion-title>

        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <p>
          {/* {sayHello()}! My name is {this.formattedName()}. My name was passed in through a */}
          {sayHello()}! My name is {this.authUser.displayName}. My name was passed in through a
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
