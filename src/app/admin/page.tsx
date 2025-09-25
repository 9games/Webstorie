import { cookies } from 'next/headers';
import AdminDashboard from '@/components/admin/AdminDashboard';
import LoginForm from '@/components/admin/LoginForm';
import { getPublishedStories } from '@/lib/data';

export default async function AdminPage() {
  const isLoggedIn = cookies().has('admin-auth');
  
  if (!isLoggedIn) {
    return <LoginForm />;
  }

  const stories = await getPublishedStories();

  return <AdminDashboard initialStories={stories} />;
}
