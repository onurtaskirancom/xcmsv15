import AdminLayout from './layout';

const AdminPage = ({ children, title }) => (
  //<AdminLayout title={title}>{children}</AdminLayout>
  <div>
    <h1 className="text-2xl font-bold mb-4 text-sky-300">
      Onur Taskiran Blog Admin Panel
    </h1>
  </div>
);

export default AdminPage;



