import fs from 'fs';
import mockAxios from 'jest-mock-axios';
import path from 'path';

export default mockAxios;

function joinBasePath(filepath) {
  // return path.join(__dirname, 'mockdata', filepath);
  return path.join('tests', '__mocks__', 'mockdata', filepath);
}

function endpointToFilename(url) {
  const filePath =
    url
      .replace('/', '')
      // We encode the URL components because Windows cannot handle ?, & and other characters
      .split('/')
      .map(encodeURIComponent)
      .join(path.sep);

  return joinBasePath(filePath);
}



function resolveReq({req, url}) {
  if (!mockAxios.lastReqGet()) {
    throw new Error('No request to Axios recorded !');
  }

  const request = mockAxios.lastReqGet();
  return req ? req : ( url ? mockAxios.getReqByUrl(url) : mockAxios.lastReqGet() );
}

mockAxios.mockResponseFromFile = ({ file, req, url } = {}) => {

  const reqInfo = resolveReq({req, url});

  if(!reqInfo)
    throw new Error('No request found! url:'+url);

  const jsonfilepath = file ? joinBasePath(file) : endpointToFilename(reqInfo.url);

  let rawdata = fs.readFileSync(jsonfilepath);
  let parsedData = JSON.parse(rawdata);

  mockAxios.mockResponse(
    { data: parsedData, status: 200, statusText: 'OK', headers: {}, config: {} },
    reqInfo,
  );
};
