import { Component, Prop, State, Event, EventEmitter } from '@stencil/core';
import firebase from 'firebase/app';
import 'firebase/auth';

import { setAuthUser } from '../../shared/state';


let user: any = null;
// let loggedin: boolean;

@Component({
    tag: 'auth-service',
    styleUrl: 'auth-service.css'
})
export class AuthService {
    @Event() authStateChanged: EventEmitter;

    @Prop() userx: any = "blah"
    @Prop() changed: any

    // @State() user: any;

    @State() userPhoto: any = '/assets/icon/icon.png'
    userEmail: any = null
    userTest: any = "songza"
    // @State() loggedin: boolean;



    @Prop() config = {
        apiKey: "AIzaSyAMSSh4VrW9w7FxgdCMMx4ZVbouht95lhI",
        authDomain: "ionfire-2e475.firebaseapp.com",
        databaseURL: "https://ionfire-2e475.firebaseio.com",
        projectId: "ionfire-2e475",
        storageBucket: "ionfire-2e475.appspot.com",
        messagingSenderId: "139743657138"
    };

    checkUserStatus() {
        // if
        // await firebase.auth().onAuthStateChanged((user) => {

        console.log(firebase.apps.length);

        if (firebase.apps.length) {
            // User is signed in.
            console.log("firebase initialized", user)
        } else {
            // No user is signed in.
            console.log("firebase not yet initailized")
            firebase.initializeApp(this.config);

        }
    }
    componentWillLoad() {
        this.checkUserStatus();
        if (user) {
            console.log(user)
            this.userPhoto = user.photoURL
        }

    }
    logout(event) {
        console.log(event)
        this.userPhoto = "/assets/icon/icon.png"
        // loggedin = false;

        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("signedout")
            user = null
            setAuthUser({ displayName: "null" })
            this.authStateChanged.emit(user);

            // this.userPhoto = "/assets/icon/icon.png"

        }).catch(function (error) {
            // An error happened.
            console.log(error)
        });
    }
    login(event) {
        console.log("event", event)
        // loggedin = true;

        // firebase.initializeApp(this.config);
        if (!user) {
            console.log(firebase.apps.length)

            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // var token = result.credential.accessToken;
                // The signed-in user info.
                console.log("result", result);
                // loggedin = true;

                user = result.user;
                setAuthUser(result.user)
                this.authStateChanged.emit(user);
                this.userPhoto = user.photoURL
                console.log(this.userPhoto)
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
            // <h1>{this.userx} - {this.changed}</h1>
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/" />
                        <ion-button expand="block" href="/">
                            <ion-icon name="arrow-back"></ion-icon>
                        </ion-button>

                    </ion-buttons>
                    <ion-title>Login</ion-title>
                </ion-toolbar>
            </ion-header>,

            <ion-content padding>
                <ion-button class={'auth-' + (user ? 'hidden' : 'showing')} onClick={(event: UIEvent) => this.login(event)} expand="block">LOgin</ion-button>
                <ion-button class={'auth-' + (user ? 'showing' : 'hidden')} onClick={(event: UIEvent) => this.logout(event)} expand="block">Logout</ion-button>

                <h2>{this.changed}</h2>

                <app-dictionary userPhoto2={this.userPhoto}></app-dictionary>

            </ion-content>
        ]
    }
}