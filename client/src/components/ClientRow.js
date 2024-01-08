import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id }, // Input that the mutation requires
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }], // refetching queries is slow (refetching queries to update the ui)
    //   update(cache, { data: { deleteClient } }) {
    //     // better way to handle ui update after a mutaion is executed
    //     const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //     const { projects } = cache.readQuery({ query: GET_PROJECTS });
    //     cache.writeQuery({
    //       query: GET_CLIENTS,
    //       data: {
    //         clients: clients.filter((client) => client.id !== deleteClient.id),
    //       },
    //     });
    //   },
    // }
  });

  function handleDelete() {
    const answer = window.confirm('Do you want to remove this client?');
    if (!answer) return;

    deleteClient(client.id);
  }

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          // onClick={() => deleteClient(client.id)}
          // or
          onClick={handleDelete}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
