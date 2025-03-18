import * as React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EnhancedButtonProps extends ButtonProps {
  /**
   * Shows a loading spinner and disables the button
   */
  isLoading?: boolean;

  /**
   * Shows a success state after action completes
   */
  isSuccess?: boolean;

  /**
   * Text to show when button is in loading state
   */
  loadingText?: string;

  /**
   * Text to show when button is in success state
   */
  successText?: string;

  /**
   * Enable ripple effect on click
   */
  enableRipple?: boolean;

  /**
   * Callback function when action is complete
   */
  onActionComplete?: () => void;
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      isSuccess = false,
      loadingText,
      successText,
      enableRipple = true,
      onActionComplete,
      children,
      onClick,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [ripples, setRipples] = React.useState<
      { x: number; y: number; size: number }[]
    >([]);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    // Combine the passed ref with our local ref
    React.useImperativeHandle(ref, () => buttonRef.current!);

    // Handle success state
    React.useEffect(() => {
      if (isSuccess) {
        setShowSuccess(true);
        const timer = setTimeout(() => {
          setShowSuccess(false);
          if (onActionComplete) onActionComplete();
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [isSuccess, onActionComplete]);

    // Handle ripple effect
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (enableRipple && !isLoading && !disabled) {
        const button = buttonRef.current;
        if (button) {
          const rect = button.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height) * 2;
          const x = event.clientX - rect.left - size / 2;
          const y = event.clientY - rect.top - size / 2;

          const newRipple = { x, y, size };
          setRipples([...ripples, newRipple]);

          setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r !== newRipple));
          }, 600);
        }
      }

      // Call the original onClick handler
      if (onClick) onClick(event);
    };

    // Determine button content based on state
    let buttonContent = children;

    if (isLoading) {
      buttonContent = (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText || children}
        </>
      );
    } else if (showSuccess) {
      buttonContent = (
        <>
          <svg
            className="mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {successText || children}
        </>
      );
    }

    return (
      <Button
        ref={buttonRef}
        className={cn(
          "relative overflow-hidden transition-all",
          showSuccess && "bg-green-600 hover:bg-green-700 text-white",
          className,
        )}
        variant={variant}
        size={size}
        disabled={isLoading || disabled}
        onClick={handleClick}
        {...props}
      >
        {/* Ripple effects */}
        {ripples.map((ripple, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/30 animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}

        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center">
          {buttonContent}
        </span>
      </Button>
    );
  },
);

EnhancedButton.displayName = "EnhancedButton";

export { EnhancedButton };
