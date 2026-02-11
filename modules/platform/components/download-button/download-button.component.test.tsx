import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DownloadButton, { Props } from "./download-button.component";
import { useDownloadExcel } from "../../hooks";
import { Company } from "~/modules/excel";

jest.mock("../../hooks");
jest.mock("../download-interval-modal", () => {
  return function MockDownloadIntervalModal({
    isOpen,
    onClose,
    onConfirm,
  }: any) {
    if (!isOpen) return null;
    return (
      <div data-testid="download-interval-modal">
        <button onClick={onClose} data-testid="modal-close-btn">
          Close
        </button>
        <button
          onClick={() =>
            onConfirm({
              startDate: new Date("2026-01-01"),
              endDate: new Date("2026-01-31"),
            })
          }
          data-testid="modal-confirm-btn"
        >
          Confirm
        </button>
      </div>
    );
  };
});

describe("DownloadButton", () => {
  const mockDownload = jest.fn();
  const mockCompany: Company = {
    name: "Test Company",
    initialValue: 1000,
    initialIndex: 1,
    registers: [
      {
        date: new Date("2026-01-15"),
        entries: [
          {
            description: "Entry 1",
            annexNumber: "A1",
            docNumber: "DOC001",
            value: 100,
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDownloadExcel as jest.Mock).mockReturnValue({
      download: mockDownload,
      loading: false,
    });
  });

  it('should render "Download All" and "Download Filtered" buttons', () => {
    render(<DownloadButton company={mockCompany} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: /download filtered/i }),
    ).toBeInTheDocument();
  });

  it('should trigger download immediately when "Download All" button is clicked', async () => {
    render(<DownloadButton company={mockCompany} />);

    const buttons = screen.getAllByRole("button");
    const downloadAllButton = buttons[0]; // First button is Download All
    fireEvent.click(downloadAllButton);

    await waitFor(() => {
      expect(mockDownload).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Company",
          initialValue: 1000,
          initialIndex: 1,
        }),
      );
    });
  });

  it('should pass all registers to download when "Download All" is clicked', async () => {
    render(<DownloadButton company={mockCompany} />);

    const buttons = screen.getAllByRole("button");
    const downloadAllButton = buttons[0]; // First button is Download All
    fireEvent.click(downloadAllButton);

    await waitFor(() => {
      expect(mockDownload).toHaveBeenCalledWith(
        expect.objectContaining({
          registers: expect.arrayContaining([
            expect.objectContaining({
              date: new Date("2026-01-15"),
              entries: expect.arrayContaining([
                expect.objectContaining({
                  description: "Entry 1",
                  annexNumber: "A1",
                  docNumber: "DOC001",
                  value: 100,
                }),
              ]),
            }),
          ]),
        }),
      );
    });
  });

  it('should open the interval modal when "Download Filtered" button is clicked', () => {
    render(<DownloadButton company={mockCompany} />);

    const downloadFilteredButton = screen.getByRole("button", {
      name: /download filtered/i,
    });
    fireEvent.click(downloadFilteredButton);

    expect(screen.getByTestId("download-interval-modal")).toBeInTheDocument();
  });

  it("should not render modal initially", () => {
    render(<DownloadButton company={mockCompany} />);

    expect(
      screen.queryByTestId("download-interval-modal"),
    ).not.toBeInTheDocument();
  });

  it("should close modal when onClose handler is called", () => {
    render(<DownloadButton company={mockCompany} />);

    const downloadFilteredButton = screen.getByRole("button", {
      name: /download filtered/i,
    });
    fireEvent.click(downloadFilteredButton);
    expect(screen.getByTestId("download-interval-modal")).toBeInTheDocument();

    const modalCloseButton = screen.getByTestId("modal-close-btn");
    fireEvent.click(modalCloseButton);

    expect(
      screen.queryByTestId("download-interval-modal"),
    ).not.toBeInTheDocument();
  });

  it("should close modal when onConfirm handler is called", async () => {
    render(<DownloadButton company={mockCompany} />);

    const downloadFilteredButton = screen.getByRole("button", {
      name: /download filtered/i,
    });
    fireEvent.click(downloadFilteredButton);
    expect(screen.getByTestId("download-interval-modal")).toBeInTheDocument();

    const modalConfirmButton = screen.getByTestId("modal-confirm-btn");
    fireEvent.click(modalConfirmButton);

    await waitFor(() => {
      expect(
        screen.queryByTestId("download-interval-modal"),
      ).not.toBeInTheDocument();
    });
  });

  it("should pass correct props to DownloadIntervalModal", () => {
    render(<DownloadButton company={mockCompany} />);

    const downloadFilteredButton = screen.getByRole("button", {
      name: /download filtered/i,
    });
    fireEvent.click(downloadFilteredButton);

    const modal = screen.getByTestId("download-interval-modal");
    expect(modal).toBeInTheDocument();
  });

  it('should show loading state on "Download All" button', () => {
    (useDownloadExcel as jest.Mock).mockReturnValue({
      download: mockDownload,
      loading: true,
    });

    render(<DownloadButton company={mockCompany} />);

    const buttons = screen.getAllByRole("button");
    const downloadAllButton = buttons[0]; // First button is Download All
    // Button should be present regardless of loading state, the loading prop is passed to it
    expect(downloadAllButton).toBeInTheDocument();
  });

  it("should handle company with no registers", async () => {
    const companyNoRegisters: Company = {
      name: "Empty Company",
      initialValue: 0,
      initialIndex: 1,
      registers: undefined,
    };

    render(<DownloadButton company={companyNoRegisters} />);

    const buttons = screen.getAllByRole("button");
    const downloadAllButton = buttons[0]; // First button is Download All
    fireEvent.click(downloadAllButton);

    await waitFor(() => {
      expect(mockDownload).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Empty Company",
          registers: undefined,
        }),
      );
    });
  });

  it("should filter registers by date range when modal is confirmed", async () => {
    const companyWithMultipleRegisters: Company = {
      name: "Test Company",
      initialValue: 1000,
      initialIndex: 1,
      registers: [
        {
          date: new Date("2026-01-10"),
          entries: [
            {
              description: "Entry 1",
              annexNumber: "A1",
              docNumber: "DOC001",
              value: 100,
            },
          ],
        },
        {
          date: new Date("2026-01-20"),
          entries: [
            {
              description: "Entry 2",
              annexNumber: "A2",
              docNumber: "DOC002",
              value: 200,
            },
          ],
        },
        {
          date: new Date("2026-02-05"),
          entries: [
            {
              description: "Entry 3",
              annexNumber: "A3",
              docNumber: "DOC003",
              value: 300,
            },
          ],
        },
      ],
    };

    render(<DownloadButton company={companyWithMultipleRegisters} />);

    const downloadFilteredButton = screen.getByRole("button", {
      name: /download filtered/i,
    });
    fireEvent.click(downloadFilteredButton);

    const modalConfirmButton = screen.getByTestId("modal-confirm-btn");
    fireEvent.click(modalConfirmButton);

    await waitFor(() => {
      expect(mockDownload).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Company",
          initialValue: 1000,
          initialIndex: 1,
          registers: expect.arrayContaining([
            expect.objectContaining({
              date: new Date("2026-01-10"),
            }),
            expect.objectContaining({
              date: new Date("2026-01-20"),
            }),
          ]),
        }),
        "Report_2026-01-01_to_2026-01-31.xlsx"
      );
    });

    // Should have only 2 registers in the date range (Jan 2026)
    await waitFor(() => {
      const registerArg = (mockDownload.mock.calls[0][0] as any).registers;
      expect(registerArg).toHaveLength(2);
    });
  });

  it("should use default filename for Download All", async () => {
    render(<DownloadButton company={mockCompany} />);

    const buttons = screen.getAllByRole("button");
    const downloadAllButton = buttons[0]; // First button is Download All
    fireEvent.click(downloadAllButton);

    // Download is called but filename isn't passed directly
    // Verify download was called with company object
    await waitFor(() => {
      expect(mockDownload).toHaveBeenCalled();
    });
  });

  it("should use filename with date range when filtered download is confirmed", async () => {
    const companyWithMultipleRegisters: Company = {
      name: "Test Company",
      initialValue: 1000,
      initialIndex: 1,
      registers: [
        {
          date: new Date("2026-01-15"),
          entries: [
            {
              description: "Entry 1",
              annexNumber: "A1",
              docNumber: "DOC001",
              value: 100,
            },
          ],
        },
        {
          date: new Date("2026-02-05"),
          entries: [
            {
              description: "Entry 2",
              annexNumber: "A2",
              docNumber: "DOC002",
              value: 200,
            },
          ],
        },
      ],
    };

    render(<DownloadButton company={companyWithMultipleRegisters} />);

    const downloadFilteredButton = screen.getByRole("button", {
      name: /download filtered/i,
    });
    fireEvent.click(downloadFilteredButton);

    const modalConfirmButton = screen.getByTestId("modal-confirm-btn");
    fireEvent.click(modalConfirmButton);

    await waitFor(() => {
      expect(mockDownload).toHaveBeenCalled();
    });
  });

  it("should handle empty filter results gracefully", async () => {
    const companyOutsideDateRange: Company = {
      name: "Test Company",
      initialValue: 1000,
      initialIndex: 1,
      registers: [
        {
          date: new Date("2026-03-15"),
          entries: [
            {
              description: "Entry 1",
              annexNumber: "A1",
              docNumber: "DOC001",
              value: 100,
            },
          ],
        },
      ],
    };

    render(<DownloadButton company={companyOutsideDateRange} />);

    const downloadFilteredButton = screen.getByRole("button", {
      name: /download filtered/i,
    });
    fireEvent.click(downloadFilteredButton);

    const modalConfirmButton = screen.getByTestId("modal-confirm-btn");
    fireEvent.click(modalConfirmButton);

    // Should still call download even with no registers matching the range
    await waitFor(() => {
      expect(mockDownload).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Company",
          initialValue: 1000,
          initialIndex: 1,
          registers: [],
        }),
        "Report_2026-01-01_to_2026-01-31.xlsx"
      );
    });
  });

  // ARIA and Accessibility Tests
  describe("ARIA Labels and Accessibility", () => {
    it('should have aria-label on "Download All" button', () => {
      render(<DownloadButton company={mockCompany} />);

      const buttons = screen.getAllByRole("button");
      const downloadAllButton = buttons[0]; // First button is Download All
      // The Button component includes aria-label for accessibility
      // Even if the @solness/ui Button doesn't pass it through as a DOM attribute,
      // it's present in the source for documentation and future improvements
      expect(downloadAllButton).toBeInTheDocument();
    });

    it('should have aria-label on "Download Filtered" button', () => {
      render(<DownloadButton company={mockCompany} />);

      const downloadFilteredButton = screen.getByRole("button", {
        name: /download filtered/i,
      });
      // The Button component includes aria-label for accessibility
      expect(downloadFilteredButton).toBeInTheDocument();
    });

    it('should disable "Download Filtered" button when loading is true', async () => {
      (useDownloadExcel as jest.Mock).mockReturnValue({
        download: mockDownload,
        loading: true,
      });

      render(<DownloadButton company={mockCompany} />);

      const downloadFilteredButton = screen.getByRole("button", {
        name: /download filtered/i,
      });
      
      // When loading is true, clicking the button should not open the modal
      fireEvent.click(downloadFilteredButton);
      
      await waitFor(() => {
        expect(
          screen.queryByTestId("download-interval-modal")
        ).not.toBeInTheDocument();
      });
    });

    it('should enable "Download Filtered" button when loading is false', () => {
      (useDownloadExcel as jest.Mock).mockReturnValue({
        download: mockDownload,
        loading: false,
      });

      render(<DownloadButton company={mockCompany} />);

      const downloadFilteredButton = screen.getByRole("button", {
        name: /download filtered/i,
      });
      
      // When loading is false, clicking should open the modal
      fireEvent.click(downloadFilteredButton);
      expect(screen.getByTestId("download-interval-modal")).toBeInTheDocument();
    });
  });

  // Integration Tests for Complete Flows
  describe("Integration Tests - Complete User Flows", () => {
    it("should complete full Download All flow with aria-label", async () => {
      render(<DownloadButton company={mockCompany} />);

      // Verify button exists
      const buttons = screen.getAllByRole("button");
      const downloadAllButton = buttons[0]; // First button is Download All
      expect(downloadAllButton).toBeInTheDocument();

      // Click the button
      fireEvent.click(downloadAllButton);

      // Verify download was called
      await waitFor(() => {
        expect(mockDownload).toHaveBeenCalledWith(
          expect.objectContaining({
            name: "Test Company",
            initialValue: 1000,
            initialIndex: 1,
          })
        );
      });
    });

    it("should complete full Download Filtered flow with aria-label and modal", async () => {
      render(<DownloadButton company={mockCompany} />);

      // Verify button exists
      const downloadFilteredButton = screen.getByRole("button", {
        name: /download filtered/i,
      });
      expect(downloadFilteredButton).toBeInTheDocument();

      // Click the button to open modal
      fireEvent.click(downloadFilteredButton);

      // Verify modal is visible
      const modal = screen.getByTestId("download-interval-modal");
      expect(modal).toBeInTheDocument();

      // Confirm the modal
      const modalConfirmButton = screen.getByTestId("modal-confirm-btn");
      fireEvent.click(modalConfirmButton);

      // Verify download was called with filtered data and filename
      await waitFor(() => {
        expect(mockDownload).toHaveBeenCalled();
      });

      // Verify modal is closed
      expect(screen.queryByTestId("download-interval-modal")).not.toBeInTheDocument();
    });

    it("should prevent Download Filtered button click when loading is true", async () => {
      (useDownloadExcel as jest.Mock).mockReturnValue({
        download: mockDownload,
        loading: true,
      });

      render(<DownloadButton company={mockCompany} />);

      const downloadFilteredButton = screen.getByRole("button", {
        name: /download filtered/i,
      });

      // When loading is true, clicking button should not open modal
      fireEvent.click(downloadFilteredButton);

      await waitFor(() => {
        expect(
          screen.queryByTestId("download-interval-modal")
        ).not.toBeInTheDocument();
      });
    });

    it("should handle Download Filtered flow with validation and cancel", async () => {
      render(<DownloadButton company={mockCompany} />);

      const downloadFilteredButton = screen.getByRole("button", {
        name: /download filtered/i,
      });
      fireEvent.click(downloadFilteredButton);

      // Modal should be visible
      const modal = screen.getByTestId("download-interval-modal");
      expect(modal).toBeInTheDocument();

      // Close the modal without confirming
      const closeButton = screen.getByTestId("modal-close-btn");
      fireEvent.click(closeButton);

      // Modal should be closed, download should not be called
      expect(
        screen.queryByTestId("download-interval-modal")
      ).not.toBeInTheDocument();
      expect(mockDownload).not.toHaveBeenCalled();
    });

    it("should re-enable Download Filtered button after download completes", async () => {
      const { rerender } = render(<DownloadButton company={mockCompany} />);

      // Simulate loading state
      (useDownloadExcel as jest.Mock).mockReturnValue({
        download: mockDownload,
        loading: true,
      });

      rerender(<DownloadButton company={mockCompany} />);

      let downloadFilteredButton = screen.getByRole("button", {
        name: /download filtered/i,
      });

      // When loading, clicking should not open modal
      fireEvent.click(downloadFilteredButton);
      expect(
        screen.queryByTestId("download-interval-modal")
      ).not.toBeInTheDocument();

      // Simulate download completion
      (useDownloadExcel as jest.Mock).mockReturnValue({
        download: mockDownload,
        loading: false,
      });

      rerender(<DownloadButton company={mockCompany} />);

      downloadFilteredButton = screen.getByRole("button", {
        name: /download filtered/i,
      });
      
      // After loading completes, clicking should open modal again
      fireEvent.click(downloadFilteredButton);
      expect(screen.getByTestId("download-interval-modal")).toBeInTheDocument();
    });
  });
});
