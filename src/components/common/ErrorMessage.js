import styles from '../../styles/components/ErrorMessage.module.scss';


export default function ErrorMessage({message}) {

const errorMessageComponent = message ? (
  <span className={styles.error}>
    <FiXCircle className={styles.icon} />
    {message}
  </span>
) : null;


return (errorMessageComponent);
}



