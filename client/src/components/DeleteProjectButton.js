import { DELETE_PROJECT } from '../mutations/projectMutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'), // is executed once the query finishes
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  function handleDeleteProject() {
    const answer = window.confirm(
      'Are you sure you want to delete this project?'
    );

    if (!answer) return;

    deleteProject();
  }

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger" onClick={handleDeleteProject}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
}
