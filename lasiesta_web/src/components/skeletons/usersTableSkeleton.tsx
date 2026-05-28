export default function UsersTableSkeleton() {
  return (
    <section className="bg-white/70 rounded-2xl border border-gray-100 shadow-sm overflow-hidden z-10 animate-pulse">
      <table className="w-full text-sm">
        <thead className="bg-[#a35c42]">
          <tr>
            {["NOME", "EMAIL", "PERFIL", "STATUS", "AÇÕES"].map((header) => (
              <th
                key={header}
                className={`px-6 py-4 text-white ${
                  header === "AÇÕES" ? "text-right" : "text-left"
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="bg-white/40">
              <td className="px-6 py-4">
                <div className="h-4 w-40 rounded bg-gray-300" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-56 rounded bg-gray-300" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-28 rounded bg-gray-300" />
              </td>
              <td className="px-6 py-4">
                <div className="h-7 w-20 rounded-full bg-gray-300" />
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gray-300" />
                  <div className="h-8 w-8 rounded-lg bg-gray-300" />
                  <div className="h-8 w-8 rounded-lg bg-gray-300" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
