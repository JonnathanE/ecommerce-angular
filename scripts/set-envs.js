const { writeFileSync, mkdirSync } = require('fs');

// Load environment variables from .env
require('dotenv').config();

// Environment file paths
const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

// Get environment variables
const apiUrl = process.env.API_URL;

if (!apiUrl) {
  throw new Error('API_URL is not defined in environment variables');
}

// Configure file content
const envConfig = {
  baseUrl: apiUrl,
};

// Generate file content
const envFileContent = `export const environment = ${JSON.stringify(envConfig, null, 2)};`;

// Create directory if it doesn't exist
mkdirSync('./src/environments', { recursive: true });

// Write configuration file
writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);

console.log('Environment file created successfully!!!');
