import { mocked } from 'ts-jest/utils';
import { screen, render, fireEvent } from '@testing-library/react';
import { useValidateSession } from '../../hooks/useValidateSession';
import { Subscribe } from '../../components/Subscribe';
import { GetStripeJs } from '../../services/stripe';
import { Api } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';

jest.mock("../../hooks/useValidateSession");
jest.mock("../../services/stripe");
const useValidateSessionMock = mocked(useValidateSession);
let apiMock: MockAdapter;
let apiMockSpy: jest.SpyInstance;
let windowMockSpy: jest.SpyInstance;


describe("SignIn", () => {
    beforeEach(() => {
        apiMock = new MockAdapter(Api);
        apiMockSpy = jest.spyOn(Api, 'post');
        windowMockSpy = jest.spyOn(window, 'alert');
    })

    test("should render the component correctly", async () => {
        useValidateSessionMock.mockReturnValueOnce(() => true);

        render(<Subscribe />);

        expect(await screen.findByTestId("SubscribeNow")).toBeInTheDocument();
        expect(await screen.findByText("Subscribe now")).toBeInTheDocument();
    });

    test("should redirect user to Login when user aren't authenticated", async () => {
        useValidateSessionMock.mockReturnValueOnce(() => false);
        apiMock.onPost("http://localhost:3000/api/subscription").replyOnce(200, { data: { checkoutId: "checkoutId-01" } });

        render(<Subscribe />);
        const button = await screen.findByTestId("SubscribeNow");
        fireEvent.click(button);

        expect(apiMockSpy).toBeCalledTimes(0);
    });

    test("should execute handle Subscribe correctly", async () => {
        useValidateSessionMock.mockReturnValueOnce(() => true);
        apiMock.onPost("http://localhost:3000/api/subscription").replyOnce(200, { data: { checkoutId: "checkoutId-01" } });

        render(<Subscribe />);
        const button = await screen.findByTestId("SubscribeNow");
        fireEvent.click(button);

        expect(apiMockSpy).toBeCalledTimes(1);
        expect(apiMockSpy).toBeCalledWith("subscription");
    });

    test("should execute alert when Post Subscribe return error", async () => {
        useValidateSessionMock.mockReturnValueOnce(() => true);
        apiMock.onPost("http://localhost:3000/api/subscription").replyOnce(500, { data: { checkoutId: "checkoutId-01" } });

        render(<Subscribe />);
        const button = await screen.findByTestId("SubscribeNow");
        fireEvent.click(button);

        expect(alert).toBeCalledTimes(1);
    });
})