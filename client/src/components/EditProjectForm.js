import { UPDATE_PROJECT } from '../mutations/projectMutations';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { GET_PROJECT } from '../queries/projectQueries';

export default function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState('new');

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    // update(cache, { data: { updateProject } }) {
    //   const { project } = cache.readQuery({
    //     query: GET_PROJECT,
    //     variables: { id: updateProject.id }, // get project rquires an id
    //   });
    //   cache.writeQuery({
    //     query: GET_PROJECT,
    //     data: { ...project, updateProject },
    //   });
    // },
    // OR
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  function handleSubmit() {
    if (!name || !description || !status)
      return alert('Please provide all the details to be updated');
    updateProject(name, status, description);
  }

  return (
    <div className="mt-5">
      <h1>Update Project Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>

          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
