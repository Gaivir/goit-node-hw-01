const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const selectContact = contacts.find((contact) => contact.id === contactId);
    if (!selectContact) {
      throw new Error(`Contact with id = ${contactId} not found`);
    }
    return selectContact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
      throw new Error(`Contact with id = ${contactId} not found`);
    }

    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    const contactsString = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, contactsString);
    return contacts[idx];
  } catch (error) {
    throw error;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = { id: v4(), name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);

    const contacsString = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, contacsString);
    return newContact;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
