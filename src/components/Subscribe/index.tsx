import { useValidateSession } from '../../hooks/useValidateSession';
import { Api } from '../../services/api';
import { GetStripeJs } from '../../services/stripe';
import styles from './styles.module.scss';

export function Subscribe() {
    const validateSession = useValidateSession();
    const handleSubscription = async () => {
        try {
            if(!validateSession()) return;
            const { data } = await Api.post("subscription");
            const stripeJs = await GetStripeJs();
            await stripeJs.redirectToCheckout({ sessionId: data.checkoutId });
        } catch (error) {
            alert("Erro ao realizar operação.")
        }

    }
    return (
        <>
            <button className={styles.button}
            data-testid="SubscribeNow"
                onClick={() => handleSubscription()}>
                Subscribe now
            </button>
        </>
    )
}