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

  const containerStyle = large
    ? `${styles.container} ${styles.large}`
    : styles.container;
  const emptyStyle = large
    ? `${styles.emptyCropper} ${styles.large}`
    : styles.emptyCropper;

  //to interface with the style of the cropper component we need to use css in jsx
  //https://github.com/ricardo-ch/react-easy-crop
  const cropperStyle = large
    ? { containerStyle: { float: "right", width: "80%" } }
    : { containerStyle: { float: "right", width: "70%" } };

  const onCropComplete = useCallback((croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const mCroppedImage = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(mCroppedImage);
    } catch (e) {
      console.log(e);
    }
  }, [image, croppedAreaPixels]);

  const onCropChange = useCallback((mCrop) => {
    setCrop(mCrop);
  });

  const onZoomChange = useCallback((mZoom) => {
    setZoom(mZoom);
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
          {(croppedImage) ? <img
            className={styles.cropped_preview}
            src={croppedImage}
            alt="cropped"
          /> : <div className={styles.image_background} />}

      </div>
      <button onClick={showCroppedImage}>Crop Image</button>
    </>
  );
}
