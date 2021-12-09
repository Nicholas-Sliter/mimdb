import styles from '../../styles/components/ErrorMessage.module.scss';
import { FiXCircle } from "react-icons/fi";

export default function ErrorMessage({message}) {

const errorMessageComponent = (message && message!=="") ? (
  <span className={styles.error}>
    <FiXCircle className={styles.icon} />
    {message}
  </span>
) : null;


return (errorMessageComponent);
}



