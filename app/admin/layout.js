import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { MediaProvider } from '../context/media'; 

const AdminLayout = ({ children, title }) => (
  <MediaProvider>
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <Header title={title} />
        {children}
      </div>
    </div>
  </MediaProvider>
);

export default AdminLayout;
