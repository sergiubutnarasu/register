import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Button, Icon } from "@/modules/components/ui";

export interface PanelActionsMenuProps {
  children: React.ReactNode;
}

const PanelActionsMenu: React.FC<PanelActionsMenuProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const handleContentClick = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="hidden md:flex items-center gap-2" data-testid="panel-actions-desktop">
        {children}
      </div>

      <div className="flex md:hidden" data-testid="panel-actions-mobile">
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            <Button
              size="small"
              variant="transparent"
              aria-label="Open actions menu"
              data-testid="panel-actions-trigger"
            >
              <Icon icon="menu" />
            </Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex flex-col gap-2 min-w-[200px] z-50"
              sideOffset={4}
              align="end"
              data-testid="panel-actions-content"
              onClick={handleContentClick}
            >
              {children}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </>
  );
};

export default PanelActionsMenu;
