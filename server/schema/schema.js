const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');
// const { projects, clients } = require('../smapleData');

// Mongoose models
const Project = require('../models/Project');
const Client = require('../models/Client');

// Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  description: 'This represents a client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        // NOTE: findById won't work here because we have to find by clientId inside of Project
        // findById compares the passed id with the id of document (i.e: id of Project)
        return Project.find({ clientId: parent.id });
      },
    },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  description: 'This represents a project',
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
        // return clients.find((client) => parent.clientId === client.id);
      },
    },
  }),
});

// Root Query Type
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    client: {
      name: 'A single Client',
      description: 'Get a single client',
      type: ClientType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Client.findById(args.id);
        // return clients.find((client) => client.id === args.id);
      },
    },
    clients: {
      name: 'List of clients',
      description: 'Get all clients',
      type: new GraphQLList(ClientType),
      resolve: () => {
        return Client.find();
        // return clients.slice();
      },
    },
    project: {
      name: 'A single project',
      description: 'Get a single project',
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Project.findById(args.id);
        // return projects.find((project) => project.id === args.id);
      },
    },
    projects: {
      name: 'List of projects',
      description: 'Get all projects',
      type: new GraphQLList(ProjectType),
      resolve: () => {
        return Project.find();
        // return projects.slice();
      },
    },
  }),
});

// Root Mutation
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add a client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = {
          name: args.name,
          email: args.email,
          phone: args.phone,
        };

        return Client.create(client);
      },
    },

    // Delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Project.find({ clientId: args.id }).then((projects) => {
          // returns all associated projects with a client
          projects.forEach((project) => {
            project.deleteOne();
          });
        });

        return Client.findByIdAndDelete(args.id);
      },
    },

    // Add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              // values should be exactly the same as defined in schema
              // so, 'Not started' would not work here if we have 'Not Started' in our schema due to lowercase s
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = {
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        };

        return Project.create(project);
      },
    },

    // Delete a project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        // deleteAllFlag: { type: GraphQLString },
      },
      resolve(parent, args) {
        // if (args.deleteAllFlag === 'y') return Project.deleteMany({}); // use only when we need to delete all clients for some reason
        return Project.findByIdAndDelete(args.id);
      },
    },

    // Update project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString }, // since these are optional while updating we dont use non null
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate', // this has to be unique
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              status: args.status,
              description: args.description,
            },
          },
          { new: true } // creates a new doc if not present
        );
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
