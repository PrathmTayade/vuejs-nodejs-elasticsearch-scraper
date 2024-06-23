import esClient from "../database/elasticsearch.js";
import asyncHandler from "express-async-handler";

async function createIndex(index) {
  try {
    await esClient.indices.create({ index });
    console.log(`Created index ${index}`);
  } catch (err) {
    console.error(`An error occurred while creating the index ${index}:`);
    console.error(err);
  }
}

async function setCompaniesMapping() {
  try {
    const schema = {
      name: { type: "text" },
      cin: { type: "keyword" }, // Set CIN as keyword for exact matching
      status: { type: "keyword" },
      address: { type: "text" },
      email: { type: "keyword" },
      pin: { type: "keyword" },
      directors: {
        type: "nested",
        properties: {
          name: { type: "text" },
          designation: { type: "text" },
          appointmentDate: { type: "date" },
        },
      },
      // Add other relevant fields as needed
    };

    await esClient.indices.putMapping({
      index,
      type,
      include_type_name: true,
      body: {
        properties: schema,
      },
    });

    console.log("Mapping created successfully");
  } catch (err) {
    console.error("An error occurred while setting the quotes mapping:");
    console.error(err);
  }
}

// List all clients
const listClients = asyncHandler(async (req, res) => {
  const { hits } = await esClient.search({
    index: "clients",
    body: {
      query: {
        match_all: {},
      },
    },
  });
  console.log(hits);
  res.json(hits.hits);
});

// Create a new client
const createClient = asyncHandler(async (req, res) => {
  const clientData = req.body;
  const doc = await esClient.index({
    index: "clients",
    body: clientData,
  });
  res.status(201).json(doc);
});

// Show one client with better errors
const showClient = asyncHandler(async (req, res) => {
  const clientId = req.params.id;

  const doc = await esClient.get({
    index: "clients",
    id: clientId,
  });

  if (!doc.found) {
    return res.status(404).json({ error: "Client not found" });
  }

  res.json(doc._source); // Return client data
});

// Update a client
const updateClient = asyncHandler(async (req, res) => {
  const clientId = req.params.id;
  const clientData = req.body;
  const doc = await esClient.update({
    index: "clients",
    id: clientId,
    body: {
      doc: clientData,
    },
  });
  res.json(doc.result);
});

// Delete a client
const deleteClient = asyncHandler(async (req, res) => {
  const clientId = req.params.id;
  const doc = await esClient.delete({
    index: "clients",
    id: clientId,
  });
  res.json(doc.result);
});

// Search for a client
const searchClients = asyncHandler(async (req, res) => {
  const searchTerm = req.query.q;
  const { hits } = await esClient.search({
    index: "clients",
    body: {
      query: {
        multi_match: {
          query: searchTerm,
          fields: ["id", "name", "cin", "email"],
        },
      },
    },
  });
  res.json(hits.hits);
});

export {
  listClients,
  createClient,
  showClient,
  updateClient,
  deleteClient,
  searchClients,
};
