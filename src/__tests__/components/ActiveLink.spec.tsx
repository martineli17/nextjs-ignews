import { screen, render } from '@testing-library/react';
import { ActiveLink } from "../../components/ActiveLink";
import "@testing-library/jest-dom/extend-expect"

jest.mock("next/router", () => {
    return{
        useRouter(){
            return {
                asPath: "/"
            }
        }
    }
})


describe("ActiveLink", () => {
    test("should render the component correctly", async () => {
        render(
            <ActiveLink href="/" classActive="active">
                <a>Home</a>
            </ActiveLink>
        );
        expect(await screen.findByText("Home")).toBeInTheDocument();
    });

    test("should render the component with className", async () => {
        render(
            <ActiveLink href="/" classActive="active">
                <a>Home</a>
            </ActiveLink>
        );
        expect(await screen.findByText("Home")).toHaveClass("active");
    });

    test("should render the component without className", async () => {
        render(
            <ActiveLink href="/teste" classActive="active">
                <a>Home</a>
            </ActiveLink>
        );
        expect(await screen.findByText("Home")).not.toHaveClass("active");
    })
})