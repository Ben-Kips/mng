const asyncHandler = require("express-async-handler");
const Client = require("../models/clientModel");

//@desc get all clients
//@route GET /api/clients
//@access private

const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({ user_id: req.user.id });
  res.status(200).json(clients);
});

//@desc Create new  clients
//@route POST /api/clients
//@access private

const createClients = asyncHandler(async (req, res) => {
  const { name, email, subject, clientMessage } = req.body;
  if (!name || !email || !subject || !clientMessage) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const client = await Client.create({
    name,
    email,
    subject,
    clientMessage,
  });
  res.status(201).json(client);
});

//@desc Get client
//@route POST /api/clients/:id
//@access private

const getClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) {
    res.status(404);
    throw new Error("Client Not Found ");
  }

  res.status(200).json(client);
});
//@desc Delete client
//@route delete /api/clients/:id
//@access private

const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) {
    res.status(404);
    throw new Error("Client Not Found ");
  }
  if (client.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don' t have permission to update other user client");
  }
  await Client.findOneAndRemove({ _id: req.params.id });
  res.status(200).json(client);
});
//@desc update client
//@route Put /api/clients/:id
//@access private

const updateClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) {
    res.status(404);
    throw new Error("Client Not Found ");
  }

  if (client.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don' t have permission to update other user client");
  }
  const updatedClient = await Client.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedClient);
});
module.exports = {
  getClients,
  createClients,
  getClient,
  deleteClient,
  updateClient,
};
