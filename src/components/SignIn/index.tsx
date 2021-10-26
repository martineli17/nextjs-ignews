import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';
import { signIn, signOut, useSession } from 'next-auth/client'

export function SignIn() {
    const [session] = useSession();
    return (
        <div data-testid="Signin" >
            {session ?
                (
                    <button
                        className={styles.button}>
                        <FaGithub color="#04d361"/>
                        {session.user?.name}
                        <FiX
                            onClick={() => signOut()}
                            color="#737380"
                            className={styles.closeIcon} />
                    </button>
                )
                :
                (
                    <button
                        onClick={() => signIn("github")}
                        className={styles.button}>
                        <FaGithub color="orange" />
                        Sign in with Github
                    </button>
                )
            }
        </div>
    )
}