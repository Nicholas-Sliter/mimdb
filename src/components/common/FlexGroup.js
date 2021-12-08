import styles from "../../styles/components/FlexGroup.module.scss";

export default function FlexGroup({ children }) {
  return <div className={styles.group}>{children}</div>;
}
