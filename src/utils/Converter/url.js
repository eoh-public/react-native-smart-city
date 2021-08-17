const queryStringToObject = (queryString) => {
  return JSON.parse(
    '{"' +
      decodeURI(queryString)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/[=]/g, '":"') +
      '"}'
  );
};

export const queryStringToPath = (url) => {
  const splitUrl = url.split('?');
  const queryString = queryStringToObject(splitUrl[1]);
  return `${splitUrl[0]}/${queryString.code}/${queryString.oauth2_backend_url}`;
};
