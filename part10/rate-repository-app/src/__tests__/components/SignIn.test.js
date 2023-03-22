import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";

describe("SignIn", () => {
  it("calls onSubmit function with correct credentials", async () => {
    const onSubmit = jest.fn();
    render(<SignInContainer onSubmit={onSubmit} />);
    const username = "kalle";
    const password = "password";
    fireEvent.changeText(screen.getByTestId("username"), username);
    fireEvent.changeText(screen.getByTestId("password"), password);
    fireEvent.press(screen.getByText("Sign In"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username,
        password,
      });
    });
  });
});
