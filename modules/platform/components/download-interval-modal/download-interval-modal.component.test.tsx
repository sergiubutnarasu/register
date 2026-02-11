import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import moment from 'moment';
import DownloadIntervalModal from './download-interval-modal.component';
import { getPreviousMonthRange } from '../../helpers';

jest.mock('@solness/ui', () => ({
  ...jest.requireActual('@solness/ui'),
  Datepicker: ({ value, onChange }: any) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = new Date(e.target.value);
      onChange(date);
    };
    return (
      <input
        data-testid="datepicker"
        type="date"
        value={value ? moment(value).format('YYYY-MM-DD') : ''}
        onChange={handleChange}
      />
    );
  },
  Button: ({ onClick, color, transparent, children }: any) => {
    return (
      <button 
        onClick={onClick} 
        data-color={color}
        data-transparent={transparent}
        className={transparent ? 'transparent' : color || 'primary'}
      >
        {children}
      </button>
    );
  },
}));

describe('DownloadIntervalModal', () => {
  const mockOnConfirm = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with title and datepicker inputs', () => {
    render(
      <DownloadIntervalModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    expect(screen.getByText(/select download interval/i)).toBeInTheDocument();
    const datepickers = screen.getAllByTestId('datepicker');
    expect(datepickers).toHaveLength(2);
  });

  it('should not render when isOpen is false', () => {
    const { container } = render(
      <DownloadIntervalModal
        isOpen={false}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should set default values to previous month range', () => {
    const now = new Date('2026-02-08');
    const previousMonthRange = getPreviousMonthRange(now);

    render(
      <DownloadIntervalModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        currentDate={now}
      />
    );

    const dateInputs = screen.getAllByTestId('datepicker') as HTMLInputElement[];
    
    // The datepicker inputs should have the default values from previous month
    expect(dateInputs[0].value).toBe(
      moment(previousMonthRange.startDate).format('YYYY-MM-DD')
    );
    expect(dateInputs[1].value).toBe(
      moment(previousMonthRange.endDate).format('YYYY-MM-DD')
    );
  });

  it('should display labels for start and end date inputs', () => {
    render(
      <DownloadIntervalModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    expect(screen.getByText(/start date/i)).toBeInTheDocument();
    expect(screen.getByText(/end date/i)).toBeInTheDocument();
  });

  it('should call onConfirm with selected date range when confirm button is clicked', async () => {
    const startDate = new Date('2026-01-01');
    const endDate = new Date('2026-01-31');

    render(
      <DownloadIntervalModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        currentDate={new Date('2026-02-08')}
      />
    );

    const dateInputs = screen.getAllByTestId('datepicker');
    
    // Change start date
    fireEvent.change(dateInputs[0], {
      target: { value: moment(startDate).format('YYYY-MM-DD') },
    });

    // Change end date
    fireEvent.change(dateInputs[1], {
      target: { value: moment(endDate).format('YYYY-MM-DD') },
    });

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalledWith(
        expect.objectContaining({
          startDate: expect.any(Date),
          endDate: expect.any(Date),
        })
      );
    });
  });

  it('should call onClose when close button or cancel button is clicked', async () => {
    const { rerender } = render(
      <DownloadIntervalModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });

    // Reset mocks
    mockOnClose.mockClear();

    // Test close button (X button in modal header)
    mockOnClose.mockClear();
    rerender(
      <DownloadIntervalModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );

    // The X button is the first unnamed button
    const buttons = screen.getAllByRole('button');
    const closeButton = buttons.find(btn => btn.textContent === '');
    if (closeButton) {
      fireEvent.click(closeButton);
    }

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('should not call onConfirm when startDate is after endDate', async () => {
    const startDate = new Date('2026-02-28');
    const endDate = new Date('2026-01-01');

    render(
      <DownloadIntervalModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        currentDate={new Date('2026-02-08')}
      />
    );

    const dateInputs = screen.getAllByTestId('datepicker');
    
    // Set invalid range (start after end)
    fireEvent.change(dateInputs[0], {
      target: { value: moment(startDate).format('YYYY-MM-DD') },
    });

    fireEvent.change(dateInputs[1], {
      target: { value: moment(endDate).format('YYYY-MM-DD') },
    });

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockOnConfirm).not.toHaveBeenCalled();
    });
  });

  it('should show validation error when startDate is after endDate', async () => {
    const startDate = new Date('2026-02-28');
    const endDate = new Date('2026-01-01');

    render(
      <DownloadIntervalModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        currentDate={new Date('2026-02-08')}
      />
    );

    const dateInputs = screen.getAllByTestId('datepicker');
    
    // Set invalid range
    fireEvent.change(dateInputs[0], {
      target: { value: moment(startDate).format('YYYY-MM-DD') },
    });

    fireEvent.change(dateInputs[1], {
      target: { value: moment(endDate).format('YYYY-MM-DD') },
    });

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText(/start date must be before or equal to end date/i)).toBeInTheDocument();
    });
  });

  it('should allow same date for start and end', async () => {
    const sameDate = new Date('2026-01-15');

    render(
      <DownloadIntervalModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        currentDate={new Date('2026-02-08')}
      />
    );

    const dateInputs = screen.getAllByTestId('datepicker');
    
    // Set same date for both
    fireEvent.change(dateInputs[0], {
      target: { value: moment(sameDate).format('YYYY-MM-DD') },
    });

    fireEvent.change(dateInputs[1], {
      target: { value: moment(sameDate).format('YYYY-MM-DD') },
    });

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalledWith(
        expect.objectContaining({
          startDate: expect.any(Date),
          endDate: expect.any(Date),
        })
      );
    });
  });

  it('should show gray button and prevent confirm when validation fails', async () => {
    const startDate = new Date('2026-02-28');
    const endDate = new Date('2026-01-01');

    render(
      <DownloadIntervalModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        currentDate={new Date('2026-02-08')}
      />
    );

    const dateInputs = screen.getAllByTestId('datepicker');
    
    // Set invalid range
    fireEvent.change(dateInputs[0], {
      target: { value: moment(startDate).format('YYYY-MM-DD') },
    });

    fireEvent.change(dateInputs[1], {
      target: { value: moment(endDate).format('YYYY-MM-DD') },
    });

    const confirmButton = screen.getByRole('button', { name: /confirm/i });

    await waitFor(() => {
      // Button should have gray color when validation fails
      expect(confirmButton).toHaveAttribute('data-color', 'gray');
    });
    
    // Clicking should not call onConfirm
    fireEvent.click(confirmButton);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('should clear validation error when dates become valid again', async () => {
    const invalidStart = new Date('2026-02-28');
    const invalidEnd = new Date('2026-01-01');
    const validStart = new Date('2026-01-01');
    const validEnd = new Date('2026-02-28');

    render(
      <DownloadIntervalModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        currentDate={new Date('2026-02-08')}
      />
    );

    const dateInputs = screen.getAllByTestId('datepicker');
    
    // Set invalid range
    fireEvent.change(dateInputs[0], {
      target: { value: moment(invalidStart).format('YYYY-MM-DD') },
    });

    fireEvent.change(dateInputs[1], {
      target: { value: moment(invalidEnd).format('YYYY-MM-DD') },
    });

    // Error should appear
    await waitFor(() => {
      expect(screen.getByText(/start date must be before or equal to end date/i)).toBeInTheDocument();
    });

    // Fix the dates
    fireEvent.change(dateInputs[0], {
      target: { value: moment(validStart).format('YYYY-MM-DD') },
    });

    fireEvent.change(dateInputs[1], {
      target: { value: moment(validEnd).format('YYYY-MM-DD') },
    });

    // Error should disappear
    await waitFor(() => {
      expect(screen.queryByText(/start date must be before or equal to end date/i)).not.toBeInTheDocument();
    });
  });
});
