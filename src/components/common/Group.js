import styles from "../../styles/components/Group.module.scss";

export default function Group({children}){
      return (
         <div className={styles.group}>
               {children}
         </div>
      )
}