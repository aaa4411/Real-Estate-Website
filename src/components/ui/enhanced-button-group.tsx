import * as React from "react";
import { EnhancedButton, EnhancedButtonProps } from "./enhanced-button";
import { cn } from "@/lib/utils";

export interface ButtonAction {
  /**
   * Text to display on the button
   */
  label: string;

  /**
   * Button variant
   */
  variant?: EnhancedButtonProps["variant"];

  /**
   * Icon to display before the label
   */
  icon?: React.ReactNode;

  /**
   * Function to call when button is clicked
   */
  onClick: () => Promise<void> | void;

  /**
   * Text to display when action is successful
   */
  successText?: string;

  /**
   * Text to display while action is loading
   */
  loadingText?: string;

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
}

export interface EnhancedButtonGroupProps {
  /**
   * Array of button actions to display
   */
  actions: ButtonAction[];

  /**
   * Size of all buttons in the group
   */
  size?: EnhancedButtonProps["size"];

  /**
   * Additional class names for the button group container
   */
  className?: string;

  /**
   * Layout direction of the buttons
   */
  direction?: "horizontal" | "vertical";
}

export function EnhancedButtonGroup({
  actions,
  size = "default",
  className,
  direction = "horizontal",
}: EnhancedButtonGroupProps) {
  const [actionStates, setActionStates] = React.useState<{
    [key: number]: { loading: boolean; success: boolean };
  }>({});

  const handleAction = async (index: number, action: ButtonAction) => {
    try {
      // Set loading state
      setActionStates((prev) => ({
        ...prev,
        [index]: { loading: true, success: false },
      }));

      // Execute the action
      await action.onClick();

      // Set success state
      setActionStates((prev) => ({
        ...prev,
        [index]: { loading: false, success: true },
      }));

      // Reset success state after 2 seconds
      setTimeout(() => {
        setActionStates((prev) => ({
          ...prev,
          [index]: { loading: false, success: false },
        }));
      }, 2000);
    } catch (error) {
      console.error("Action failed:", error);
      setActionStates((prev) => ({
        ...prev,
        [index]: { loading: false, success: false },
      }));
    }
  };

  return (
    <div
      className={cn(
        "flex gap-2",
        direction === "vertical" ? "flex-col" : "flex-row flex-wrap",
        className,
      )}
    >
      {actions.map((action, index) => {
        const state = actionStates[index] || { loading: false, success: false };

        return (
          <EnhancedButton
            key={index}
            variant={action.variant || "default"}
            size={size}
            isLoading={state.loading}
            isSuccess={state.success}
            loadingText={action.loadingText}
            successText={action.successText}
            disabled={action.disabled}
            onClick={() => handleAction(index, action)}
          >
            {action.icon && <span className="mr-2">{action.icon}</span>}
            {action.label}
          </EnhancedButton>
        );
      })}
    </div>
  );
}
