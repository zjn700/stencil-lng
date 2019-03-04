import { Component, Prop, State, Listen } from '@stencil/core';
import { getAuthUser } from '../../shared/state';


@Component({
    tag: 'app-main',
    styleUrl: 'app-main.css'
})
export class AppMain {
    @State() reLoad: boolean = false;
    @Prop({ mutable: true }) authUser: any
    @Prop() section: any = "main"

    @Listen('authStateChanged')
    authStateChanged(event: CustomEvent) {
        // this.authUser = { loggedIn: event.detail }
        // this.authUser = { loggedIn: event.detail != null, details: event.detail }
        this.authUser = getAuthUser("main event listener")
        this.reLoad = !this.reLoad

        console.log('Received the custom todoCompleted event: ', event.detail);

        // this.handleAuthStateChanged(event)
    }

    async handleAuthStateChanged(event) {
        this.reLoad = !this.reLoad;

        console.log('Received the custom todoCompleted event: ', event.detail);
        this.authUser = { loggedIn: event.detail != null, details: event.detail }
        console.log("main auth state changed - new authUser", this.authUser)
        this.reLoad = !this.reLoad;
        await console.log("reload state", this.reLoad)
    }

    componentWillLoad() {
        console.log('main will load 1', this.authUser)

        this.authUser = getAuthUser("main- will load");
        console.log('main will load 2', this.authUser)

        // console.log('will load after get auth user', this.authUser)

    }
    componentWillUpdate() { console.log('main will update', this.authUser) }
    componentDidLoad() { console.log('main did load', this.authUser) }
    componentDidUpdate() { console.log('main did update', this.authUser) }
    componentDidUnload() { console.log('main did unload', this.authUser) }


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
                    <h1>{this.authUser.loggedIn ? this.authUser.details.displayName : "Please log in..."}</h1>

                    {/* <h1>{getAuthUser("main - render").displayName}</h1> */}

                    {/* <ion-button href="/login" expand="block">Login</ion-button>
                    <ion-button href="/profile/ionic" expand="block">Profile page</ion-button> */}
                    {/* <ion-button href="/profile-dupe/Krika" expand="block">Profile Dupe page</ion-button>
              <ion-button href="/dictionary" expand="block">Dictionary</ion-button> */}
                    <ion-button href="/main/auth" expand="block">new login</ion-button>
                    <ion-button href={"/main/profile:" + this.authUser.details.displayName} expand="block">new profile</ion-button>
                    <ion-button href="/main/dictionary" expand="block">new dictionary</ion-button>

                </ion-grid>

                <auth-service authUser={this.authUser.details} hidden={(this.section == "auth" ? false : true)}></auth-service>

                {/* userPhoto={this.authUser.loggedIn ? this.authUser.details.photoURL : this.authUser.details.photoURL} */}
                <app-dictionary authUser={this.authUser.details}
                    userPhoto={this.authUser.details.photoURL}
                    hidden={(this.section == "dictionary" ? false : true)} ></app-dictionary>

                <app-profile authUser={this.authUser.details} hidden={(this.section.startsWith(`profile`) ? false : true)}></app-profile>


                {/* <app-dictionary userPhoto2={this.authUser.photoURL}
                    hidden={(this.section == "dictionary" ? false : true)} ></app-dictionary>
                <app-profile authUser={this.authUser} hidden={(this.section == "profile" ? false : true)}></app-profile> */}

            </ion-content>
        ];
    }




}