import { SignIn } from '../SignIn';
import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';

export function Header() {
    return (
        <>
            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <img src={"/images/logo.svg"} alt="Logo da aplicação Ig.News" />
                    <nav>
                        <ActiveLink href="/" classActive={styles.active}>
                            <a>
                                Home
                            </a>
                        </ActiveLink>
                        <ActiveLink href="/posts" classActive={styles.active}>
                            <a>
                                Posts
                            </a>
                        </ActiveLink>
                    </nav>
                    <SignIn />
                </div>
            </header>
        </>
    )
}