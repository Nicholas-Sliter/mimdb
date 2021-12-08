import styles from "../styles/Introduction.module.scss";
import Link from "next/link";


export default function Introduction() {

    return (
        <div className={styles.container}>
            <div className={styles.introSheet}>
                <h1>Welcome to Middlebury Movie Database</h1>
                <p>
                    If this is your first time submitting a movie as a director please click on the New Director Submit button in order to add yourself as a director. You can add all of your personal info, and a brief biography. After you have added yourself, submit your film! 
                </p>
            </div>
            <div className={styles.buttonBar}>
                <Link
                href={``}
                //Need to add link to director submission page
                passHref
                key="New_Director_Submit"
                >
                    <p>New Director Submit</p>
                </Link> 
                
                <Link
                href="/submit"
                passHref
                key="New_Director_Submit"
                >
                    <p>New Film Submit</p>
                </Link>

            </div>



        </div>

    )


}