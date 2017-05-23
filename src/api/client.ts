import axios from 'axios';
import camelCaseRecursive from 'camelcase-keys-recursive';

export default axios.create({
  // Transforms response to have camel case keys for OCD-ness.
  transformResponse: (data: any) => camelCaseRecursive(JSON.parse(data)),
});
