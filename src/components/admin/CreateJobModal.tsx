import { useState } from "react";
import { supabase } from "../../api/supabase"; // SESUAIKAN PATH

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateJobModal({ open, onClose }: Props) {
  const profileItems = [
    { name: "Full name", default: "mandatory" },
    { name: "Photo Profile", default: "off" },
    { name: "Gender", default: "off" },
    { name: "Domicile", default: "off" },
    { name: "Email", default: "mandatory" },
    { name: "Phone number", default: "mandatory" },
    { name: "Linkedin link", default: "off" },
    { name: "Date of birth", default: "off" },
  ];

  // ===== PROFILE REQUIREMENTS =====
  const [profileValues, setProfileValues] = useState(
    Object.fromEntries(
      profileItems.map((f) => [
        f.name.replace(/\s+/g, "").toLowerCase(),
        f.default,
      ])
    )
  );

  const updateValue = (key: string, val: string) => {
    setProfileValues((prev) => ({ ...prev, [key]: val }));
  };

  // ===== FORM STATE =====
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [description, setDescription] = useState("");
  const [need, setNeed] = useState(1);
  const [salaryMin, setSalaryMin] = useState<number | null>(null);
  const [salaryMax, setSalaryMax] = useState<number | null>(null);

  // ===== LOADING =====
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // ============================================================
  // 🔥 SUBMIT HANDLER — INSERT JOB + JOB CONFIG
  // ============================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jobId = `job_${Date.now()}`;

      const slug = jobTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      // 1️⃣ Insert into jobs table
      const { error: jobError } = await supabase.from("jobs").insert({
        id: jobId,
        slug,
        title: jobTitle,
        status: "active",
        salary_min: salaryMin,
        salary_max: salaryMax,
        salary_currency: "IDR",
        salary_display: `${salaryMin} - ${salaryMax}`,
        badge: jobType,
        started_on_text: "",
        cta: "",
      });

      if (jobError) throw jobError;

      // 2️⃣ Insert job configuration (profile fields)
      const { error: configError } = await supabase
        .from("job_configurations")
        .insert({
          job_id: jobId,
          config: profileValues,
        });

      if (configError) throw configError;

      alert("Job published successfully!");
      onClose();
    } catch (err: any) {
      console.error("Error:", err.message);
      alert("Failed to publish job.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // UI
  // ============================================================
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-6">Create New Job</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* JOB TITLE */}
          <div>
            <label className="block text-sm font-medium mb-1 text-left">
              Job Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Ex. Front End Engineer"
              required
            />
          </div>

          {/* JOB TYPE */}
          <div>
            <label className="block text-sm font-medium mb-1 text-left">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              required
            >
              <option value="">Select job type...</option>
              <option>Full-time</option>
              <option>Contract</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Freelance</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-1 text-left">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Describe responsibilities, requirements..."
              required
            />
          </div>

          {/* NUMBER OF CANDIDATES */}
          <div>
            <label className="block text-sm font-medium mb-1 text-left">
              Number of Candidates Needed <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={1}
              value={need}
              onChange={(e) => setNeed(Number(e.target.value))}
              className="w-full rounded-lg border px-3 py-2"
              required
            />
          </div>

          {/* SALARY */}
          <div>
            <h3 className="text-sm font-semibold text-left mb-2">Job Salary</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-left">
                  Minimum Salary *
                </label>

                <div className="relative">
                  <span className="absolute left-3 top-2">Rp</span>
                  <input
                    type="number"
                    value={salaryMin ?? ""}
                    onChange={(e) => setSalaryMin(Number(e.target.value))}
                    className="w-full rounded-lg border pl-10 px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1 text-left">
                  Maximum Salary *
                </label>

                <div className="relative">
                  <span className="absolute left-3 top-2">Rp</span>
                  <input
                    type="number"
                    value={salaryMax ?? ""}
                    onChange={(e) => setSalaryMax(Number(e.target.value))}
                    className="w-full rounded-lg border pl-10 px-3 py-2"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PROFILE CONFIG */}
          <div>
            <h3 className="text-sm font-semibold text-left mb-3">
              Minimum Profile Information Required
            </h3>

            {profileItems.map(({ name }) => {
              const key = name.replace(/\s+/g, "").toLowerCase();
              const selected = profileValues[key];

              return (
                <div
                  key={name}
                  className="grid grid-cols-2 items-center py-3 border-b"
                >
                  <span className="text-sm">{name}</span>

                  <div className="flex justify-end gap-2">
                    {["mandatory", "optional", "off"].map((v) => (
                      <button
                        type="button"
                        key={v}
                        onClick={() => updateValue(key, v)}
                        className={`px-3 py-1 rounded-lg text-sm border ${
                          selected === v
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              {loading ? "Publishing..." : "Publish Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
