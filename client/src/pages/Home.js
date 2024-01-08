import Clients from '../components/Clients';
import AddClientModal from '../components/AddClientModal';
import Projects from '../components/Projects';
import AddProjectModal from '../components/AddProjectModal';

export default function Home() {
  return (
    <>
      <h2>Projects</h2>
      <Projects />
      <h2>Clients</h2>
      <hr />
      <Clients />
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
    </>
  );
}
