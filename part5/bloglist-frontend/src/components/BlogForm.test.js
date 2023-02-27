import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  let container;
  const onCreateBlog = jest.fn();

  beforeEach(() => {
    container = render(<BlogForm createBlog={onCreateBlog} />).container;
  });

  test("calls the event handler it received as props with the right details when a new blog is created", async () => {
    const user = userEvent.setup();

    const title = "Test Title";
    const author = "Test Author";
    const url = "http://test.com";

    const titleInput = container.querySelector("input[name='title']");
    const authorInput = container.querySelector("input[name='author']");
    const urlInput = container.querySelector("input[name='url']");
    const submitBtn = container.querySelector("button[type='submit']");

    await user.type(titleInput, title);
    await user.type(authorInput, author);
    await user.type(urlInput, url);
    await user.click(submitBtn);

    expect(onCreateBlog).toHaveBeenCalledTimes(1);
    expect(onCreateBlog).toHaveBeenCalledWith({ title, author, url });
  });
});
