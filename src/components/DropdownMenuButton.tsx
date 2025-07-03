import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

interface Action {
  label: string;
  onClick: () => void;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  type?: "select";
  class?: string;
  closeOnClick?: boolean;
  value?: string;
  options?: string[];
}

interface Props {
  actions: Action[];
  onOpen?: () => void;
  icon?: React.ReactNode;
  buttonDivClass?: string;
  buttonClass?: string;
  dropdownDivClass?: string;
  ulClass?: string;
}

export default function DropdownMenuButton({
  actions,
  icon = <MoreVertical size={18} />,
  onOpen = () => {},
  buttonDivClass = "absolute top-2 right-2 m-1 bg-transparent",
  buttonClass = "active:outline-none focus:outline-none focus:ring-2 hover:text-gray-400",
  dropdownDivClass = "absolute right-0 mt-2 w-36 bg-white border rounded shadow z-10",
  ulClass = "text-sm text-gray-800",
}: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleClose = (shouldClose = true) => {
    if (shouldClose) setOpen(false);
  };

  return (
    <div className={buttonDivClass} ref={menuRef}>
      <button
        onClick={(e) => {
          e.currentTarget.blur();
          if (!open) onOpen();
          setOpen((prev) => !prev);
        }}
        className={buttonClass}
      >
        {icon}
      </button>

      {open && (
        <div className={dropdownDivClass}>
          <div className={ulClass}>
            {actions.map((action, index) => {
              if (action.type === "select") {
                return (
                  <select
                    key={index}
                    value={action.value}
                    onChange={(e) => {
                      action.onChange?.(e);
                      handleClose(action.closeOnClick !== false);
                    }}
                    className={action.class || ""}
                  >
                    {action.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                );
              }

              return (
                <button
                  key={index}
                  onClick={() => {
                    action.onClick();
                    handleClose(action.closeOnClick !== false);
                  }}
                  className={
                    action.class ??
                    "w-full text-left px-4 py-2 hover:bg-gray-100"
                  }
                  title={action.label}
                  type="button"
                >
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
