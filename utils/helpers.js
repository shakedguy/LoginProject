exports.getContacts = (db) => {
  const contacts = [];
  db.forEach((contact, index) => {
    contacts.push({
      id: index,
      name: contact.name,
      phone: contact.phone,
      send: false,
    });
  });

  return contacts;
};
