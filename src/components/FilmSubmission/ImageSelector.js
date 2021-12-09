// Select an image from a list of pre-defined images

import styles from '../../styles/components/ImageSelector.module.scss';

export default function ImageSelector({images, selectedImage, onImageSelect}) {

  return (
    <div className={styles.imageSelector}>
      {images.map((image) => {
        const imageClass = (image !== selectedImage) ? styles.image : styles.image + " " + styles.selected;
        console.log(imageClass);
        const imagePartial = image.split(".")[0].split("/") ?? [""];
        const imageName = imagePartial[imagePartial.length - 1] ?? "";
        
        //get the image alt from the name
        return (
            <img src={image} alt={image} title={imageName} key={image}
            className={imageClass}
            onClick={() => onImageSelect(image)}>
          </img>
        );
      })}
    </div>
  );
}