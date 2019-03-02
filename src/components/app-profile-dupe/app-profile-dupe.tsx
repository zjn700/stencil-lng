import { Component, Prop, State } from '@stencil/core';
import { sayHello } from '../../helpers/utils';

@Component({
    tag: 'app-profile-dupe'
    //   styleUrl: 'app-profile.css'
})
export class AppProfileDupe {

    @State() state = false;
    @State() state2 = true;
    @Prop() name: string;

    formattedName(): string {
        if (this.name) {
            return this.name.substr(0, 1).toUpperCase() + this.name.substr(1).toLowerCase();
        }
        return '';
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/" />
                    </ion-buttons>
                    <ion-title>Profile 2222: {this.name}</ion-title>
                </ion-toolbar>
            </ion-header>,

            <ion-content padding>

                <p>
                    {sayHello()}! My name is {this.formattedName()}. My name was passed in through a
                    route param!
                    </p>
                <ion-grid fixed>

                    <ion-item>
                        <ion-label>Setting ({this.state.toString()})</ion-label>
                        <ion-toggle
                            checked={this.state}
                            onIonChange={ev => (this.state = ev.detail.checked)}
                        />
                    </ion-item>

                    <ion-item>
                        <ion-label>Setting ({this.state2.toString()})</ion-label>
                        <ion-toggle
                            checked={this.state2}
                            onIonChange={ev => (this.state2 = ev.detail.checked)}
                        />
                    </ion-item>
                </ion-grid>

                <app-dictionary></app-dictionary>
            </ion-content>
        ];
    }
}
