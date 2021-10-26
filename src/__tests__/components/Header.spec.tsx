import { screen, render } from '@testing-library/react';
import { Header } from "../../components/Header";

jest.mock("next/router", () => {
    return{
        useRouter(){
            return {
                asPath: "/"
            }
        }
    }
})

jest.mock("next-auth/client", () => {
    return{
        useSession(){
            return [null, false]
        }
    }
})


describe("Header", () => {
    test("should render the component correctly with link to Home", async () => {
        render(<Header />);
        expect(await screen.findByText("Home")).toBeInTheDocument();
    });

    test("should render the component with link to Posts", async () => {
        render(<Header />);
        expect(await screen.findByText("Posts")).toBeInTheDocument();
    });

    test("should render the component with Sigin", async () => {
        render(<Header />);
        expect(await screen.findByTestId("Signin")).toBeInTheDocument();
    });
})