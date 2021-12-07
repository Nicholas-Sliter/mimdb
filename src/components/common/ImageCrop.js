import Cropper from "react-easy-crop";
import React, { useState, useCallback } from "react";
import getCroppedImg from "../../lib/cropImage";

import styles from "../../styles/components/ImageCrop.module.scss";

export default function ImageCrop({
  image,
  croppedImage,
  setCroppedImage,
  aspect = 1,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    console.log("showCroppedImage");
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
      <div className={styles.container}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
          />
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
