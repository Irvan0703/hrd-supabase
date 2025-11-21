type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
};

export default function Input({ type="text", ...props }: Props) {
  return (
    <input
      {...props}
      type={type}
      className="w-full border p-2 rounded"
    />
  );
}
