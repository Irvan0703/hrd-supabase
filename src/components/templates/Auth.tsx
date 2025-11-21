export default function AuthTemplate({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">

      {/* Logo */}
      <div className="mb-6 w-full max-w-md flex flex-col items-start">
        <img 
          src="/rakamin-logo.png"
          alt="Rakamin Logo"
          className="h-10 mb-1"
        />
      </div>

      {/* Card */}
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        
        {/* JUDUL RATA KIRI */}
        <h2 className="text-xl font-semibold mb-6 text-left">
          {title}
        </h2>

        {/* FORM */}
        <div className="text-left">
          {children}
        </div>
      </div>
    </div>
  );
}
