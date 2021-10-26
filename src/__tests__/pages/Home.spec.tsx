import { render, screen } from '@testing-library/react';
import React from 'react';
import { mocked } from 'ts-jest/utils';
import Home, { getStaticProps } from '../../pages';
import { StripeApi } from "../../services/stripe";

jest.mock("../../components/Subscribe", () => {
    return {
        Subscribe: () => (<div data-testid="SubscribeNow"></div>)
    }
});

jest.mock("../../services/stripe");

describe("Home Page", () => {
    test("should render correctly", async () => {
        render(<Home product={{ amount: "R$99,99", priceId: "01" }} />);

        expect(await screen.findByTestId("SubscribeNow")).toBeInTheDocument();
        expect(await screen.findByText("for R$99,99 month")).toBeInTheDocument();
    });

    test("should return GetStaticProps correctly", async () => {
        const stipeMock = mocked(StripeApi.prices.retrieve);
        stipeMock.mockResolvedValueOnce({id: "01", unit_amount: 999} as any);
        const response = await getStaticProps({});
        expect(response).toEqual(
            expect.objectContaining({
                props:{
                    product: {
                        priceId: "01",
                        amount: new Intl.NumberFormat("un-US", {
                            style: "currency",
                            currency: "USD"
                          }).format(999 / 100)
                    }
                  },
            })
        )
    })
})