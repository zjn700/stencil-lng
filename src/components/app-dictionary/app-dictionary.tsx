import { Component, Prop, State } from '@stencil/core';
// import  rirebase  from 'firebase'
// import * as firebase from 'firebase';
// import * as firebase from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuthUser } from '../../shared/state';

// (anonymous) @app-dictionary.md.entry.js: 47780

@Component({
    tag: 'app-dictionary',
    styleUrl: 'app-dictionary.css'
})
export class AppDictonary {

    // @Prop({ mutable: true }) authUser: any
    // @State() authUser: any


    @State() hidden: boolean = false
    @Prop() shown: boolean = true
    @State() changed: boolean = false;
    // @Prop() items = [1, 2, 3, 4, 5, 6, 7, { name: "joe" }]
    @Prop() items = [{ name: "Joe" }, { name: "Joe" }, { name: "Joe" }, { name: "Joe" }]
    @Prop() test: String = "one"

    @Prop({ connect: 'ion-toast-controller' })
    toastCtrl: HTMLIonToastControllerElement;

    @State() user: any;
    userPhotoDefault: any = '/assets/icon/icon.png'
    // @Prop({ mutable: true }) userPhoto: any
    @Prop() userPhoto: any
    @Prop() displayName: any
    @Prop({ mutable: true }) authUser: any


    // @Prop({ mutable: true }) @State() userPhoto: any
    userTest: any = "songza"
    userEmail: any = null
    // @Watch('userPhoto')
    // watchHandler(newValue: any, oldValue: any) {
    //     console.log('The new value of activated is: ', newValue, oldValue);
    // }

    @Prop() config = {
        apiKey: "AIzaSyAMSSh4VrW9w7FxgdCMMx4ZVbouht95lhI",
        authDomain: "ionfire-2e475.firebaseapp.com",
        databaseURL: "https://ionfire-2e475.firebaseio.com",
        projectId: "ionfire-2e475",
        storageBucket: "ionfire-2e475.appspot.com",
        messagingSenderId: "139743657138"
    };

    componentWillLoad() {

        console.log('dict will load 1', this.userPhoto, this.authUser);
        this.authUser = getAuthUser("from profile will load")
        // this.userPhoto = (this.authUser.loggedIn) ? this.authUser.photoURL : this.userPhotoDefault
        console.log('dict will load 222222', this.authUser.photoURL);

    }
    componentWillUpdate() { console.log('dict will update', this.userPhoto, this.authUser) }
    componentDidLoad() { console.log('dict did load', this.userPhoto, this.authUser) }
    componentDidUpdate() { console.log('dict did update', this.userPhoto, this.authUser) }
    componentDidUnload() { console.log('dict did unload', this.userPhoto, this.authUser) }

    showToast(event: UIEvent): any {

        // const toast = this.toastCtrl.create({
        //     message: "New version available",
        //     showCloseButton: true,
        //     closeButtonText: "Reload"
        // });

        console.log("here in showToast", event)

        this.handleToaster()
        // firebase.initializeApp(this.config);

        // let provider = new firebase.auth.GoogleAuthProvider();
        // firebase.auth().signInWithPopup(provider).then((result) => {
        //     // This gives you a Google Access Token. You can use it to access the Google API.
        //     // var token = result.credential.accessToken;
        //     // The signed-in user info.
        //     console.log("result", result);

        //     this.user = result.user;
        //     // console.log("user", this.user)
        //     this.userPhoto = this.user.photoURL
        //     this.userEmail = this.user.email
        //     console.log(this.userPhoto)
        //     // this.changed = true;
        //     // ...
        // }).catch(function (error) {
        //     // Handle Errors here.
        //     console.log("ERROR:", error)
        //     // var errorCode = error.code;
        //     // var errorMessage = error.message;
        //     // // The email of the user's account used.
        //     // var email = error.email;
        //     // // The firebase.auth.AuthCredential type that was used.
        //     // var credential = error.credential;
        //     // ...
        // });



    }
    // registration.waiting.postMessage("skipWaiting");
    // window.location.reload();
    async handleToaster() {
        console.log('here in handleToaster')
        const toast = await this.toastCtrl.create({
            message: "New version available",
            showCloseButton: true,
            closeButtonText: "Reload"
        });
        console.log("here in showToast")
        await toast.present();
        await toast.onWillDismiss();
        window.location.reload();

    }
    // toaster = this.showToast()
    async checkUserStatus() {
        await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                console.log("logged in", user)
            } else {
                // No user is signed in.
                console.log("not logged in")
            }
        });
    }


    render() {
        // if (this.user) {
        //     return (<div>Hello {this.user.email}</div>)
        // } else {
        //     //   return ( <div>Hello, World</div> )

        // }
        return [
            // <ion-header>
            //     <ion-toolbar color="primary">
            //         <ion-buttons slot="start">
            //             <ion-back-button defaultHref="/" />
            //         </ion-buttons>
            //         <ion-title>Dictionary</ion-title>
            //     </ion-toolbar>
            // </ion-header>

            <ion-header class={this.hidden ? "hidden" : "shown"} >
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/" />
                    </ion-buttons>
                    <ion-title>Dictionary</ion-title>
                </ion-toolbar>
            </ion-header>,

            <ion-content padding>
                {/* <auth-service userx={this.userTest} changed={this.userEmail}></auth-service> */}

                <ion-toast-controller></ion-toast-controller>
                <ion-button onClick={(event: UIEvent) => this.showToast(event)} expand="block">Taost</ion-button>
                <ion-grid>
                    <ion-row>
                        {this.authUser.photoURL}
                        {/* <ion-img src={this.authUser.photoURL}></ion-img> */}
                        <ion-img src={this.userPhoto}></ion-img>
                    </ion-row>
                    <ion-row>
                        {/* <ion-col col-6 col-md-4> */}
                        {this.items.map((item) =>
                            <ion-col>
                                <ion-card class="noob">Name {item.name}</ion-card>
                            </ion-col>


                        )}
                        {/* </ion-col> */}
                    </ion-row>

                </ion-grid>

                <ion-grid fixed>
                    <ion-list>
                        {/* <ion-button onClick={this.showToast()} expand="block">Taost</ion-button> */}
                        <ion-item>Item 1</ion-item>
                        <ion-item>Item 2</ion-item>
                        <ion-item>Item 3</ion-item>
                        <ion-item>Item 4</ion-item>
                        <ion-item>Item 5</ion-item>
                    </ion-list>
                </ion-grid>


                {/* <ion-button href="/profile/ionic" expand="block">Profile page</ion-button>
                <ion-button href="/profile-dupe" expand="block">Profile Dupe page</ion-button>
                <ion-button href="/dictionary" expand="block">Dictionary</ion-button> */}

                {/* {this.items.map((item) =>
                    <div>
                        <div>{item}</div>
                    </div>
                )} */}
                {/* <ion-card>xxx {this.items}</ion-card> */}



                {/* 
                <ion-grid>
                    {this.items.map((item) =>
                        <ion-card class="noobie">Name {item.name}</ion-card>
                    )}
                </ion-grid> */}

            </ion-content>
        ];
    }
}