const request = async (options = {}) => {
  const res = await fetch("/.netlify/functions/api", {
    method: "POST",
    body: JSON.stringify(options),
  });

  if (res.ok) {
    return res.json();
  }
  throw new Error(res.status);
};

export const getDocuments = async () => {
  const data = await request({ url: "/documents" });

  return await data;
};

export const getDocument = async pageId => {
  const data = await request({ url: `/documents/${pageId}` });

  return await data;
};

export const updateDocument = async (pageId, content) => {
  await request({
    url: `/documents/${pageId}`,
    method: "PUT",
    body: JSON.stringify(content),
  });
};

export const createDocument = async parentId => {
  const data = await request({
    url: "/documents",
    method: "POST",
    body: JSON.stringify({
      title: "",
      parent: parentId,
    }),
  });

  return await data;
};

export const deleteDocument = async id => {
  await request({
    url: `/documents/${id}`,
    method: "DELETE",
  });
};
