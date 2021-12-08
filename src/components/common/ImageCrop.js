import Cropper from "react-easy-crop";
import React, { useState, useCallback } from "react";
import getCroppedImg from "../../lib/cropImage";

import styles from "../../styles/components/ImageCrop.module.scss";

export default function ImageCrop({
  image,
  croppedImage,
  setCroppedImage,
  aspect = 1,
  large=false
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const containerStyle = (large) ? `${styles.container} ${styles.large}` : styles.container;
  const emptyStyle = large
    ? `${styles.emptyCropper} ${styles.large}`
    : styles.emptyCropper;


 const cropperStyle = { containerStyle: {float:'right',width:'60%'} };


  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.log(e);
    }
  }, [image, croppedAreaPixels]);

  const onCropChange = useCallback((crop) => {
    setCrop(crop);
  });

  const onZoomChange = useCallback((zoom) => {
    setZoom(zoom);
  });

  return (
    <>
      <div className={containerStyle}>
        {image ? (
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
            style={cropperStyle}
          />
        ) : (
          <div className={emptyStyle} />
        )}
        {croppedImage ? (
          <img
            className={styles.cropped_preview}
            src={croppedImage}
            alt="cropped"
          />
        ) : null}
      </div>
      <button onClick={showCroppedImage}>Crop Image</button>
    </>
  );
}

//className={styles.cropContainer}

//show the cropped image
