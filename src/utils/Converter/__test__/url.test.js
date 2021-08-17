import { queryStringToPath } from '../url';

test('test queryStringToPath', () => {
  const oldUrl =
    // eslint-disable-next-line max-len
    'app://eoh/sync-lg-device?state=1&code=CODE&user_number=VN2106012039192&oauth2_backend_url=https%3A%2F%2Fkr.lgeapi.com%2F';
  const newUrl = queryStringToPath(oldUrl);
  expect(newUrl).toEqual(
    'app://eoh/sync-lg-device/CODE/https%3A%2F%2Fkr.lgeapi.com%2F'
  );
});
