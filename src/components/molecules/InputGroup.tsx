import { useState } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showTogglePassword?: boolean;
}

export default function InputGroup({
  label,
  type = "text",
  showTogglePassword = false,
  ...props
}: Props) {
  const [show, setShow] = useState(false);

  const inputType = showTogglePassword ? (show ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative">
        <input
          {...props}
          type={inputType}
          className="
            w-full px-3 py-2 rounded-md
            border border-gray-300
            focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
            transition
          "
        />

        {showTogglePassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {show ? "🙈" : "👁️"}
          </button>
        )}
      </div>
    </div>
  );
}
