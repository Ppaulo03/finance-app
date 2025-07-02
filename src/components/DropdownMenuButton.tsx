import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

interface Action {
  label: string;
  onClick: () => void;
  onChange?: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  type?: string;
  class?: string;
  closeOnClick?: boolean;
  value?: string;
  options?: string[];
}

interface DropdownMenuButtonProps {
  actions: Action[];
  onOpen?: () => void;
  icon?: React.ReactNode;
  button_div_class?: string;
  button_class?: string;
  dropdown_div_class?: string;
  ul_class?: string;
}

export default function DropdownMenuButton({
  actions,
  icon = <MoreVertical size={18} />,
  onOpen = () => {},
  button_div_class = "absolute top-2 right-2 m-1 bg-transparent",
  button_class = "active:outline-none focus:outline-none focus:ring-2 hover:text-gray-400",
  dropdown_div_class = "absolute right-0 mt-2 w-36 bg-white border rounded shadow z-10",
  ul_class = "text-sm text-gray-800",
}: DropdownMenuButtonProps) {
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

  return (
    <div className={button_div_class} ref={menuRef}>
      <button
        onClick={(e) => {
          e.currentTarget.blur();
          if (!open) {
            onOpen();
          }
          setOpen((prev) => !prev);
        }}
        className={button_class}
      >
        {icon}
      </button>

      {open && (
        <div className={dropdown_div_class}>
          <div className={ul_class}>
            {actions.map((action, index) => (
              <div key={index}>
                {action.type === "select" ? (
                  <select
                    value={action.value}
                    onChange={(event) => {
                      action.onChange?.(event);
                      if (action.closeOnClick !== false) {
                        setOpen(false);
                      }
                    }}
                    className={action.class ?? ""}
                  >
                    {action.options?.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                ) : (
                  <button
                    onClick={() => {
                      action.onClick();
                      if (action.closeOnClick !== false) {
                        setOpen(false);
                      }
                    }}
                    className={
                      action.class
                        ? action.class
                        : "w-full text-left px-4 py-2 hover:bg-gray-100"
                    }
                    title={action.label}
                    type="button"
                  >
                    {action.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
