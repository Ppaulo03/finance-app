import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

interface Action {
  label: string;
  onClick: () => void;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  type?: "select" | "button";
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

  const closeMenu = () => setOpen(false);

  // Fecha ao clicar fora ou pressionar Escape
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleActionClick = (action: Action) => {
    action.onClick();
    if (action.closeOnClick !== false) closeMenu();
  };

  const handleSelectChange = (
    action: Action,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    action.onChange?.(event);
    if (action.closeOnClick !== false) closeMenu();
  };

  const renderAction = (action: Action) => {
    if (action.type === "select") {
      return (
        <select
          key={`select-${action.label}`}
          value={action.value}
          onChange={(e) => handleSelectChange(action, e)}
          className={action.class || "w-full px-4 py-2"}
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
        key={`button-${action.label}`}
        onClick={() => handleActionClick(action)}
        className={
          action.class ?? "w-full text-left px-4 py-2 hover:bg-gray-100"
        }
        title={action.label}
        type="button"
      >
        {action.label}
      </button>
    );
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
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Dropdown menu toggle"
        type="button"
      >
        {icon}
      </button>

      {open && (
        <div
          className={dropdownDivClass}
          role="menu"
          aria-orientation="vertical"
        >
          <div className={ulClass}>{actions.map(renderAction)}</div>
        </div>
      )}
    </div>
  );
}
