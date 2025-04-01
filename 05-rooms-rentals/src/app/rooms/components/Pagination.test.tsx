import { it, describe, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import Pagination from "./Pagination"
import { vi } from "vitest"

// Mock the Next.js navigation hooks
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useSearchParams: vi.fn(() => ({
    toString: () => "",
    get: vi.fn(),
  })),
}))

describe("Pagination", () => {
  it("renders pagination controls correctly", () => {
    render(<Pagination currentPage={1} totalPages={3} setPage={() => {}} currentSort="createdAt" />)

    // Check that Previous button is disabled on first page
    const prevButton = screen.getByText("Previous")
    expect(prevButton).toBeDefined()
    expect(prevButton).toHaveProperty("disabled", true)

    // Check that Next button is enabled
    const nextButton = screen.getByText("Next")
    expect(nextButton).toBeDefined()
    expect(nextButton).toHaveProperty("disabled", false)
  })

  it("renders pagination controls for middle page", () => {
    render(<Pagination currentPage={2} totalPages={3} setPage={() => {}} currentSort="createdAt" />)

    // Check that Previous button is enabled on middle page
    const prevButton = screen.getByText("Previous")
    expect(prevButton).toBeDefined()
    expect(prevButton).toHaveProperty("disabled", false)

    // Check that Next button is enabled
    const nextButton = screen.getByText("Next")
    expect(nextButton).toBeDefined()
    expect(nextButton).toHaveProperty("disabled", false)
  })

  it("renders pagination controls for last page", () => {
    render(<Pagination currentPage={3} totalPages={3} setPage={() => {}} currentSort="createdAt" />)

    // Check that Previous button is enabled on last page
    const prevButton = screen.getByText("Previous")
    expect(prevButton).toBeDefined()
    expect(prevButton).toHaveProperty("disabled", false)

    // Check that Next button is disabled
    const nextButton = screen.getByText("Next")
    expect(nextButton).toBeDefined()
    expect(nextButton).toHaveProperty("disabled", true)
  })
})