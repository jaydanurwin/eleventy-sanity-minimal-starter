require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});
const sanityClient = require('@sanity/client');

// const { sanity } = require('../../client-config.js');

/**
 * Set manually. Find configuration in
 * studio/sanity.json or on manage.sanity.io
 */

const sanity = {
  projectId: process.env.SANITY_PROJECT_ID || 'asrlg1rg',
  dataset: 'production',
  apiVersion: process.env.SANITY_API_VERSION || 'v1',
};

module.exports = sanityClient({
  ...sanity,
  useCdn: !process.env.SANITY_READ_TOKEN,
  token: process.env.SANITY_READ_TOKEN,
});
