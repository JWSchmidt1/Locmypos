import React, { useEffect, useState } from "react";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { add, camera, close, image } from "ionicons/icons";

import { IonFab, IonButton, IonFabButton, IonIcon, IonImg } from "@ionic/react";
import { defineCustomElements } from "@ionic/pwa-elements/loader"
import { Capacitor } from "@capacitor/core";

import { gsap } from "gsap";

import FormData from "./FormData";
import { uploadFile } from "./getData";


const MyCamera = ( { position } ) => {

    const [ photos, setPhotos ] = useState( '' )
    const [ pos, setPos ] = useState( [] )
    const [fileNameDB, setFilenameDB] = useState("");

    const takePhoto = async () => {

        const photo = await Camera.getPhoto( {
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 50
        } ).catch( ( e ) => {
            throw new Error();
        } )

        const imageUrl = photo.path || photo.webPath;
        const newPath = Capacitor.convertFileSrc( imageUrl );
        setPhotos( newPath )

        document.querySelector( "#cameraimage" ).style.display = "block";

    }

    const closePhoto = () => {
        setPhotos( '' )
    }

    const uploadImage = ( path ) => {

        uploadFile( path, "image-mapmyplace" )
            .then( response => setFilenameDB( response ) )

        document.querySelector( "#myFormContainer" ).style.display = "grid";

    }

    useEffect( () => {

        defineCustomElements( window );
        setPos( position );

        if ( document.querySelector( '#cameraimage' ) ) {
            gsap.to( "#cameraimage", {
                duration: 1,
                rotation: 2,
                ease: "elastic.out",
            } );
        }
    }, [] )

    return (
        <>
            <FormData position={ pos } img={fileNameDB} />

            { photos ? (
                <div id="cameraimage">
                    <div id="closephoto"><IonIcon icon={ close } onClick={ closePhoto } /></div>
                    <IonImg src={ photos } />
                    <div id="saveImgContainer">
                        <IonButton color="tertiary" onClick={ async () => { await uploadImage( photos ); } } >Gem Billede</IonButton>
                    </div>
                </div>
            ) : (
                <></>
            ) }

            <IonFab
                color="primary"
                vertical="bottom"
                horizontal="center"
                slot="fixed"
            >
                <IonFabButton color="primary" onClick={ takePhoto } >
                    <IonIcon icon={ camera } />
                </IonFabButton>
            </IonFab>
        </>
    )

}

export default MyCamera