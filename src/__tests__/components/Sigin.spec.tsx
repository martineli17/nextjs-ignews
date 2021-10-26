import { mocked } from 'ts-jest/utils';
import { screen, render } from '@testing-library/react';
import { useSession } from 'next-auth/client';
import { SignIn } from "../../components/SignIn";

jest.mock("next-auth/client");
const useSessionMock = mocked(useSession);

describe("SignIn", () => {
    test("should render the component correctly when user aren't authenticated", async () => {
        useSessionMock.mockReturnValueOnce([null, false]);
        render(<SignIn />);
        expect(await screen.findByText("Sign in with Github")).toBeInTheDocument();
    });

    test("should render the component when user are authenticated", async () => {
        useSessionMock.mockReturnValueOnce([{user: {name: "Fabio" }, expires: ""}, false]);
        render(<SignIn />);
        expect(await screen.findByText("Fabio")).toBeInTheDocument();
    });
})