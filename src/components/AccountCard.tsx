import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

interface Action {
  label: string;
  onClick: () => void;
  danger?: boolean;
}

interface DropdownMenuButtonProps {
  actions: Action[];
  icon?: React.ReactNode;
}

export default function DropdownMenuButton({
  actions,
  icon = <MoreVertical size={18} />,
}: DropdownMenuButtonProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
      >
        {icon}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow rounded-md z-10 text-sm text-gray-800 dark:text-white overflow-hidden">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick();
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                action.danger ? "text-red-600" : ""
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
