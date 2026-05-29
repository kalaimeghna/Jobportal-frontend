export default function Footer() {
  return (
    <footer className="bg-black text-white mt-10 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* LEFT */}
        <p className="text-sm">
          © 2026 Job Portal. All Rights Reserved.
        </p>

        {/* RIGHT LINKS */}
        <div className="flex gap-4 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <a href="/jobs" className="hover:underline">Jobs</a>
          <a href="/companies" className="hover:underline">Companies</a>
          <a href="/profile" className="hover:underline">Profile</a>
        </div>

      </div>
    </footer>
  );
}