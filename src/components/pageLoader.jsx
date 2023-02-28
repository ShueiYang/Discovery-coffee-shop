import styles from '@/styles/layout.module.css' 
import SyncLoader from "react-spinners/SyncLoader";

function PageLoader() {
    
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.wrapper}>
        <h1>Loading</h1>
      </div>
      <SyncLoader
        color={"#373b64"}
        loading={true}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
export default PageLoader;