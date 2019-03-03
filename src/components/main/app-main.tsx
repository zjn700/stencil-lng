import { Component, State, Prop } from '@stencil/core';
import { getAuthUser } from '../../shared/state';

@Component({
    tag: 'app-main',
    styleUrl: 'app-main.css'
})
export class AppMain {
    @State() authUser
    @Prop() section: any;

    componentWillLoad() {
        console.log('will load 1', this.authUser)

        this.authUser = getAuthUser("main- will load");
        console.log('will load 2', this.authUser)

        // console.log('will load after get auth user', this.authUser)

    }
    componentWillUpdate() { console.log('will update', this.authUser) }
    componentDidLoad() { console.log('did load', this.authUser) }
    componentDidUpdate() { console.log('did update', this.authUser) }
    componentDidUnload() { console.log('did unload', this.authUser) }


    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>Main</ion-title>
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
                    <h1>{getAuthUser("main - render").displayName}</h1>

                    <ion-button href="/profile/ionic" expand="block">Profile page</ion-button>
                    {/* <ion-button href="/profile-dupe/Krika" expand="block">Profile Dupe page</ion-button>
              <ion-button href="/dictionary" expand="block">Dictionary</ion-button> */}
                    <ion-button href="/login" expand="block">Login</ion-button>
                </ion-grid>


                <app-dictionary userPhoto2={this.authUser.photoURL}
                    hidden={(this.section == "dictionary" ? false : true)} ></app-dictionary>
                <app-profile authUser={this.authUser} hidden={(this.section == "profile" ? false : true)}></app-profile>

            </ion-content>
        ];
    }




}