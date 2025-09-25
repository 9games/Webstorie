import AdminDashboard from '@/components/admin/AdminDashboard';
import { getPublishedStories } from '@/lib/data';

export default async function AdminPage() {
  const stories = await getPublishedStories();

  return <AdminDashboard initialStories={stories} />;
}
