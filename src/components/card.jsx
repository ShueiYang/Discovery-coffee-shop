import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/card.module.css"
import homeStyles from "@/styles/Home.module.css"


const Card = ({name, imgUrl, href}) => {
  
  
  
    return (
        <Link href={href} className={styles.cardLink} >
            <div className={`${styles.container} ${homeStyles.glass}`} >
                <div className={styles.cardHeaderWrapper} >
                    <h2 className={styles.cardHeader}>{name}</h2>
                </div>
                <div className={styles.cardImageWrapper} >
                    <Image 
                        className={styles.cardImage}
                        src={imgUrl || "/static/unsplash-coffee.jpg"}
                        alt="store picture"
                        width={270}
                        height={180}
                    />
                </div>
            </div>    
        </Link>
    )
}

export default Card; 