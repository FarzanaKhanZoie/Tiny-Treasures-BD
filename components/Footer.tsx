export default function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="container py-10 text-sm text-gray-600 flex flex-col gap-2">
        <div>© {new Date().getFullYear()} Four O'Clock (Free). Built for students.</div>
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" className="underline">Facebook</a>
          <a href="https://instagram.com" target="_blank" className="underline">Instagram</a>
          <a href="https://tiktok.com" target="_blank" className="underline">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
