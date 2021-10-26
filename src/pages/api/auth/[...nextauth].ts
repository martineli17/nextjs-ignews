import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { CreateAsync, ExistsAsync, HaveSubscriptionAsync } from '../../../services/userDataBase';

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            scope: "read:user"
        })
    ],
    callbacks: {
        async session(session) {
            try {
                const haveSubscription = await HaveSubscriptionAsync(session.user.email);
                return {
                    ...session,
                    haveSubscription: haveSubscription,
                }
            } catch (error) {
                return {
                    ...session,
                    haveSubscription: false,
                }
            }
        },
        async signIn(user, account, profile) {
            try {
                var success = true;
                if (!await ExistsAsync(user.email))
                    success = await CreateAsync({ data: { email: user.email, name: user.name } });
                return success;
            } catch (error) {
                return false;
            }
        }
    }
})