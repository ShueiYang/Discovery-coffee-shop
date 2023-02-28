import styles from '@/styles/layout.module.css'
import Link from "next/link"; 


function ErrorPage() {
    
  return (
    <div className={styles.layoutContainer}>
        <div className={styles.wrapper}>
            <h1>{"Something went wrong retrieving Coffee Store :("}</h1>
        </div>
        <Link href="/" className={styles.homeLink}>
            <h2>Back to home page </h2>
        </Link>
    </div>
  )
}
export default ErrorPage;