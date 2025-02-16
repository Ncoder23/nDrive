export default function HomePage(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-800 to-gray-600 p-4 text-white">
      <main className="text-center">{props.children}</main>
    </div>
  );
}