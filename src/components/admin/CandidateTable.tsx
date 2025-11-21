interface Props {
  data: any[];
}

export default function CandidateTable({ data }: Props) {
  return (
    <table className="w-full border text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Nama</th>
          <th className="p-2">Email</th>
          <th className="p-2">Job</th>
          <th className="p-2">Status</th>
          <th className="p-2">Tanggal</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b">
            <td className="p-2">{item.applicants.full_name}</td>
            <td className="p-2">{item.applicants.email}</td>
            <td className="p-2">{item.job_id}</td>
            <td className="p-2 capitalize">{item.status}</td>
            <td className="p-2">
              {new Date(item.created_at).toLocaleDateString("id-ID")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
