import { Create, Get, query, Update } from "faunadb";
import { User } from "../types/user";
import { Fauna } from "./faunadb";

export async function ExistsAsync(email: string): Promise<boolean> {
    var exists = await Fauna.query<boolean>(query.Exists(
        query.Match(
            query.Index("user_email"), query.Casefold(email)
        )
    ));
    return exists;
}

export async function UpdateAsync(user: User): Promise<boolean> {
    try {
        await Fauna.query(Update(query.Ref(query.Collection("user"), user.ref.id), user))
        return true;
    } catch (error) {
        return false;
    }
}

export async function CreateAsync(user: User): Promise<boolean> {
    try {
        await Fauna.query(Create(query.Collection("user"), user));
        return true;
    } catch (error) {
        return false;
    }
}

export async function GetAsync(email: string): Promise<User> {
    try {
        return await Fauna.query<User>(Get(query.Match(query.Index("user_email"), query.Casefold(email))));
    } catch (error) {
        return null;
    }
}

export async function HaveSubscriptionAsync(email: string): Promise<boolean> {
    try {
        const user = await GetAsync(email);
        return !!user.data.idStripe;
    } catch (error) {
        return false;
    }
}