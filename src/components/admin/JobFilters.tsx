interface Props {
  onCreate: () => void;
}

export default function JobFilters({ onCreate }: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <input
        type="text"
        placeholder="Search by job details"
        className="w-full max-w-md px-3 py-2 border rounded-lg"
      />

      <button
        onClick={onCreate}
        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Create a new job
      </button>
    </div>
  );
}
