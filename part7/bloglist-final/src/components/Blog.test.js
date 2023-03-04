import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { BrowserRouter as Router } from "react-router-dom";

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
    render(
      <Router>
        <Blog blog={blog} onLike={onLike} onDelete={onDelete} />
      </Router>
    );
  });

  test("renders title and author, but not url or likes", () => {
    const titleElem = screen.getByText(blog.title, { exact: false });
    const authorElem = screen.getByText(blog.author, { exact: false });

    expect(titleElem).toBeDefined();
    expect(authorElem).toBeDefined();

    expect(screen.queryByText(blog.url)).toBeNull();
    expect(screen.queryByText(`likes ${blog.likes}`)).toBeNull();
  });
});
