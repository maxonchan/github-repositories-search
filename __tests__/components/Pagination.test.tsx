import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Pagination from "@/components/Pagination";

describe("Pagination Component", () => {
  const onPageChangeMock = jest.fn();
  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  it("renders correctly", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("calls onPageChange when a page number is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={50}
        onPageChange={onPageChangeMock}
      />
    );
    const page3 = screen.getByText("3");
    page3.click();
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange when Prev is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={50}
        onPageChange={onPageChangeMock}
      />
    );
    const prevButton = screen.getByText("Prev");
    prevButton.click();
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange when Next is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={50}
        onPageChange={onPageChangeMock}
      />
    );
    const nextButton = screen.getByText("Next");
    nextButton.click();
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it("does not call onPageChange when the current page is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={50}
        onPageChange={onPageChangeMock}
      />
    );
    const page1 = screen.getByText("1");
    page1.click();
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  it("does not call onPageChange when ellipsis is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={50}
        onPageChange={onPageChangeMock}
      />
    );
    const ellipsis = screen.getByText("...");
    ellipsis.click();
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  it("calls onPageChange with the correct page when a page number is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={50}
        onPageChange={onPageChangeMock}
      />
    );
    const page3 = screen.getByText("3");
    page3.click();
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });
});
