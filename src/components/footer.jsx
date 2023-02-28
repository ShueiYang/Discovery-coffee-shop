import styles from '@/styles/footer.module.css' 
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";

const Footer = () => {

    return (
        
        <footer >
            <ul className={styles.social_icon}>
                <li><b>&copy; {new Date().getFullYear()} ShueiYang </b></li>
                         
                <li><a href="https://github.com/ShueiYang/Discovery-coffee-shop" rel="noreferrer"
                    target="_blank" className="cool-link"><IoLogoGithub/></a></li>
               
                <li><a href="https://www.linkedin.com/in/shueiyang" rel="noreferrer"
                    target="_blank" className="cool-link"><IoLogoLinkedin/></a></li>
            </ul>
        </footer>
    )
}

export default Footer;