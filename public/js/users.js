export const getUsers = async () => {
  const responseJson = await fetch('/api/contacts');
  const response = JSON.parse(await responseJson.text());
  return response.data.contacts;
};
