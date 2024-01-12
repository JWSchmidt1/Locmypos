import React, { useState } from 'react'
import { IonGrid, IonRow, IonCol, IonInput, IonLabel, IonButton, IonIcon, IonTextarea } from "@ionic/react";
import { close } from "ionicons/icons";

import supabase from "./supabase-client";

const FormData = ( { position, img } ) => {

    const [ location, setLocation ] = useState( '' );
    const [ comment, setComment ] = useState( '' );

    const closeLocation = () => {
        document.querySelector( "#myFormContainer" ).style.display = "none";
        document.querySelector( "#cameraimage" ).style.display = "none";
    }

    const addLocation = async ( e ) => {
        e.preventDefault();
        let { data, error } = await supabase
            .from( 'mapmyplace' )
            .insert( {
                location: location,
                comment: comment,
                latitude: position[ 0 ],
                longitude: position[ 0 ],
                image: img
            } )
    }

    return <div id="myFormContainer">
        <IonGrid>
            <form>
                <IonRow>
                    <IonCol>
                        <IonIcon icon={ close } size="large" style={ { float: "right", cursor: "pointer" } } onClick={ closeLocation } cursor="pointer" />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonLabel>Location</IonLabel>
                        <IonInput type="text" onIonChange={ ( event ) => setLocation( event.target.value ) } />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonLabel>Comment</IonLabel>
                        <IonTextarea onIonChange={ ( event ) => { setComment( event.target.value ) } } />
                    </IonCol>
                </IonRow>
                <IonRow text-right>
                    <IonCol>
                        <IonButton onClick={ addLocation }>Submit</IonButton>
                    </IonCol>
                </IonRow>
            </form>
        </IonGrid>
    </div>
}

export default FormData