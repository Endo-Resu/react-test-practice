import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
    __esModule: true,

    default: {
        get: () => ({
            data: {
                id: 1,
                name: "John"
            }
        })
    }
}))

test("username input should be rendered", () =>{
    render(<Login />);
    const userInput = screen.getByPlaceholderText(/username/i);
    expect(userInput).toBeInTheDocument()
})

test("password input should be rendered", () =>{
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument()
})

test("button should be rendered", () =>{
    render(<Login />);
    const formButton = screen.getByRole("button");
    expect(formButton).toBeInTheDocument()
})

test("loading should not be rendered", () =>{
    render(<Login />);
    const formButton = screen.getByRole("button");
    expect(formButton).not.toHaveTextContent(/Loading.../i)
})

test("username input should be empty", () =>{
    render(<Login />);
    const userInput = screen.getByPlaceholderText(/username/i);
    expect(userInput.value).toBe("")
})

test("password input should be empty", () =>{
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput.value).toBe("")
})

test("button should be disabled", () =>{
    render(<Login />);
    const formButton = screen.getByRole("button");
    expect(formButton).toBeDisabled()
})

test("error message should be invisible", () =>{
    render(<Login />);
    const errorEl = screen.getByTestId("error");
    expect(errorEl).not.toBeVisible()
})

test("username input should change", () =>{
    render(<Login />);
    const userInput = screen.getByPlaceholderText(/username/i);
    const testValue = "test";

    fireEvent.change(userInput, {target:{value:testValue}});
    expect(userInput.value).toBe(testValue)
})

test("password input should change", () =>{
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    const testValue = "test";

    fireEvent.change(passwordInput, {target:{value:testValue}});
    expect(passwordInput.value).toBe(testValue)
})

test("button should not be disabled after input changes", () =>{
    render(<Login />);
    const formButton = screen.getByRole("button");

    const userInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    const testValue = "test";

    fireEvent.change(userInput, {target:{value:testValue}});
    fireEvent.change(passwordInput, {target:{value:testValue}});

    expect(formButton).not.toBeDisabled()
})

test("loading should be rendered on click", () =>{
    render(<Login />);
    const formButton = screen.getByRole("button");

    const userInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    const testValue = "test";

    fireEvent.change(userInput, {target:{value:testValue}});
    fireEvent.change(passwordInput, {target:{value:testValue}});
    fireEvent.click(formButton)

    expect(formButton).toHaveTextContent(/Loading.../i)
})

test("loading should not be rendered after fetch", async () =>{
    render(<Login />);
    const formButton = screen.getByRole("button");

    const userInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    const testValue = "test";

    fireEvent.change(userInput, {target:{value:testValue}});
    fireEvent.change(passwordInput, {target:{value:testValue}});
    fireEvent.click(formButton)

    await waitFor(() =>expect(formButton).not.toHaveTextContent(/Loading.../i))
})

test("user should be rendered after fetch", async () =>{
    render(<Login />);
    const formButton = screen.getByRole("button");

    const userInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    const testValue = "test";

    fireEvent.change(userInput, {target:{value:testValue}});
    fireEvent.change(passwordInput, {target:{value:testValue}});
    fireEvent.click(formButton)

    const userName = await screen.findByText("John")

    expect(userName).toBeInTheDocument()
})