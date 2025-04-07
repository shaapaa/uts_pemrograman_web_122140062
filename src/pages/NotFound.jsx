import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-sky-600">404</h1>
      <p className="text-xl mt-4">Page not found</p>
      <Link to="/" className="mt-6 text-sky-600 underline">Go back home</Link>
    </div>
  );
}
