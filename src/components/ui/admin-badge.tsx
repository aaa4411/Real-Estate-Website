import { Badge, BadgeProps } from "@/components/ui/badge";
import { Shield } from "lucide-react";

interface AdminBadgeProps extends BadgeProps {
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm";
  showIcon?: boolean;
}

export function AdminBadge({
  children = "Admin",
  variant = "default",
  size = "default",
  showIcon = true,
  className,
  ...props
}: AdminBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={`bg-amber-500 hover:bg-amber-600 text-white ${size === "sm" ? "text-xs py-0 px-2" : ""} ${className}`}
      {...props}
    >
      {showIcon && <Shield className="h-3 w-3 mr-1" />}
      {children}
    </Badge>
  );
}
