import { Component, Prop, State, Event, EventEmitter } from '@stencil/core';

import firebase from 'firebase/app';
import 'firebase/auth';

import { setAuthUser } from '../../shared/state';

// global -may remove with either event-emitter, local-storage or a combo
let user: any = null;

@Component({
    tag: 'auth-service',
    styleUrl: 'auth-service.css'
})
export class AuthService {
    @Event() authStateChanged: EventEmitter;
    @Prop({ mutable: true }) authUser: any
    @Prop() changed: any
    @State() userPhoto: any = '/assets/icon/icon.png'
    userEmail: any = null
    // userTest: any = "songza"



    @Prop() config = {
        apiKey: "AIzaSyAMSSh4VrW9w7FxgdCMMx4ZVbouht95lhI",
        authDomain: "ionfire-2e475.firebaseapp.com",
        databaseURL: "https://ionfire-2e475.firebaseio.com",
        projectId: "ionfire-2e475",
        storageBucket: "ionfire-2e475.appspot.com",
        messagingSenderId: "139743657138"
    };

    checkUserStatus() {
        // check is firebase for initialized, if not, then do
        console.log(firebase.apps.length);
        if (firebase.apps.length) {
            console.log("firebase initialized", user)
        } else {
            console.log("firebase not yet initailized")
            firebase.initializeApp(this.config);
        }
    }
    componentWillLoad() {
        console.log('auth will load', this.authUser)
        this.checkUserStatus();
        if (user) {
            console.log(user)
            this.userPhoto = user.photoURL
        }
    }
    componentWillUpdate() { console.log('auth will update', this.authUser) }
    componentDidLoad() { console.log('auth did load', this.authUser) }
    componentDidUpdate() { console.log('auth did update', this.authUser) }
    componentDidUnload() { console.log('auth did unload', this.authUser) }


    logout(event) {
        console.log("logging out", event)
        // want to do these after firebase signout function, but was getting errors
        this.userPhoto = "/assets/icon/icon.png"
        user = null
        this.authUser = user;
        setAuthUser(user)

        this.authStateChanged.emit(user);

        firebase.auth().signOut().then(function () {
            console.log("now signedout")
        }).catch(function (error) {
            console.log(error)
        });
    }
    login(event) {
        console.log("event", event)
        if (!user) {

            console.log(firebase.apps.length)

            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // var token = result.credential.accessToken;

                // The signed-in user info.
                console.log("result", result);
                console.log("google credential", result.credential);

                // 3 state functions, find the one that works best
                user = result.user;
                this.authUser = user;
                setAuthUser(result.user)
                this.authStateChanged.emit(user);

                // user interface items
                this.userPhoto = user.photoURL
                this.userEmail = user.email
                console.log(this.userPhoto, this.userEmail)

            }).catch(function (error) {
                // Handle Errors here.
                console.log("ERROR:", error)
            });
        } else {
            console.log('nope')
        }
    }

    render() {

        return [
            // <ion-header>
            //     <ion-toolbar color="primary">
            //         <ion-buttons slot="start">
            //             <ion-back-button defaultHref="/" />
            //             {/* <ion-button expand="block" href="/">
            //                 <ion-icon name="arrow-back"></ion-icon>
            //             </ion-button> */}

            //         </ion-buttons>
            //         <ion-title>Login</ion-title>
            //     </ion-toolbar>
            // </ion-header>,
            // <ion-header>
            //     <ion-button href="/" expand="block">home</ion-button>
            // </ion-header>,
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-button href="/main" expand="block"><ion-icon name="arrow-back"></ion-icon></ion-button>
                        {/* <ion-button href="/" expand="block">home</ion-button> */}
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>,
            <ion-content padding>
                {/* <ion-header>
                    <ion-toolbar>
                        <ion-button href="/main" expand="block">main</ion-button>
                        <ion-button href="/" expand="block">home</ion-button>
                    </ion-toolbar>
                </ion-header> */}

                <ion-card>
                    {/* <ion-nav-pop> */}
                    {/* <ion-nav-push component="app-main"> */}

                    <ion-button class={'auth-' + (user ? 'hidden' : 'showing')} onClick={(event: UIEvent) => this.login(event)} >LOgin</ion-button>
                    <ion-button class={'auth-' + (user ? 'showing' : 'hidden')} onClick={(event: UIEvent) => this.logout(event)} >Logout</ion-button>

                    {/* </ion-nav-push> */}

                    <h2>Changed??? {this.changed}</h2>
                </ion-card>
                {/* <app-dictionary userPhoto2={this.userPhoto}></app-dictionary> */}

            </ion-content>
        ]
    }
}