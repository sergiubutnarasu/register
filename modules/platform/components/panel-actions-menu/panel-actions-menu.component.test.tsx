import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PanelActionsMenu from "./panel-actions-menu.component";

// Polyfill ResizeObserver for Radix UI in jsdom
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

describe("PanelActionsMenu", () => {
  const TestAction = ({ onClick, "data-testid": dataTestId }: any) => (
    <button onClick={onClick} data-testid={dataTestId}>Action</button>
  );

  it("renders children inline in the desktop container", () => {
    render(
      <PanelActionsMenu>
        <TestAction data-testid="action-1" />
        <TestAction data-testid="action-2" />
      </PanelActionsMenu>
    );

    const desktop = screen.getByTestId("panel-actions-desktop");
    expect(desktop).toBeInTheDocument();
    expect(desktop).toHaveClass("hidden", "md:flex");
    expect(desktop.children).toHaveLength(2);
    expect(screen.getByTestId("action-1")).toBeInTheDocument();
    expect(screen.getByTestId("action-2")).toBeInTheDocument();
  });

  it("renders hamburger button in the mobile container", () => {
    render(
      <PanelActionsMenu>
        <TestAction data-testid="action-1" />
      </PanelActionsMenu>
    );

    const mobile = screen.getByTestId("panel-actions-mobile");
    expect(mobile).toBeInTheDocument();
    expect(mobile).toHaveClass("flex", "md:hidden");

    const trigger = screen.getByTestId("panel-actions-trigger");
    expect(trigger).toBeInTheDocument();
  });

  it("opens popover when hamburger button is clicked", () => {
    render(
      <PanelActionsMenu>
        <TestAction data-testid="action-1" />
      </PanelActionsMenu>
    );

    const trigger = screen.getByTestId("panel-actions-trigger");
    fireEvent.click(trigger);

    const content = screen.getByTestId("panel-actions-content");
    expect(content).toBeInTheDocument();
  });

  it("closes popover when an action inside the popover is clicked", () => {
    render(
      <PanelActionsMenu>
        <TestAction data-testid="action-1" />
      </PanelActionsMenu>
    );

    const trigger = screen.getByTestId("panel-actions-trigger");
    fireEvent.click(trigger);

    const content = screen.getByTestId("panel-actions-content");
    expect(content).toBeInTheDocument();

    // Actions inside the popover should close it on click
    const action = content.querySelector('[data-testid="action-1"]');
    expect(action).toBeInTheDocument();
    fireEvent.click(action!);

    expect(screen.queryByTestId("panel-actions-content")).not.toBeInTheDocument();
  });
});
