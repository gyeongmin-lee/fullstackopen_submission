import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  const onLike = jest.fn();
  const onDelete = jest.fn();

  const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "http://test.com",
    likes: 0,
  };

  beforeEach(() => {
    render(<Blog blog={blog} onLike={onLike} onDelete={onDelete} />);
  });

  test("renders title and author, but not url or likes", () => {
    const titleElem = screen.getByText(blog.title, { exact: false });
    const authorElem = screen.getByText(blog.author, { exact: false });

    expect(titleElem).toBeDefined();
    expect(authorElem).toBeDefined();

    expect(screen.queryByText(blog.url)).toBeNull();
    expect(screen.queryByText(`likes ${blog.likes}`)).toBeNull();
  });

  test("url and likes are shown when the button controlling the shown details has been clicked", async () => {
    const user = userEvent.setup();

    const button = screen.getByText("view");
    await user.click(button);

    const urlElem = screen.getByText(blog.url);
    const likesElem = screen.getByText(`likes ${blog.likes}`);

    expect(urlElem).toBeDefined();
    expect(likesElem).toBeDefined();
  });

  test("if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
    const user = userEvent.setup();

    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(onLike).toHaveBeenCalledTimes(2);
  });
});
