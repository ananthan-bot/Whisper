import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
