import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'taxpayers.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Initialize data file if it doesn't exist
async function initializeDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ taxpayers: [] }));
  }
}

// Read all taxpayer data
export async function getAllTaxpayers() {
  await ensureDataDirectory();
  await initializeDataFile();
  
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data).taxpayers;
}

// Save a new taxpayer
export async function saveTaxpayer(taxpayerData: Record<string, unknown>) {
  await ensureDataDirectory();
  await initializeDataFile();

  const data = await fs.readFile(DATA_FILE, 'utf-8');
  const jsonData = JSON.parse(data);

  // Create MongoDB-compatible document structure
  const taxpayer = {
    _id: `txp_${Date.now()}`, // MongoDB-style ID
    ...taxpayerData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0 // MongoDB version key
  };

  jsonData.taxpayers.push(taxpayer);
  await fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2));
  
  return taxpayer;
}

// Get a taxpayer by ID
export async function getTaxpayerById(id: string) {
  const taxpayers = await getAllTaxpayers();
  return taxpayers.find((t: Record<string, unknown>) => t._id === id);
}

// Update a taxpayer
export async function updateTaxpayer(id: string, updates: Record<string, unknown>) {
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  const jsonData = JSON.parse(data);

  const index = jsonData.taxpayers.findIndex((t: Record<string, unknown>) => t._id === id);
  if (index === -1) return null;

  jsonData.taxpayers[index] = {
    ...jsonData.taxpayers[index],
    ...updates,
    updatedAt: new Date().toISOString(),
    __v: (jsonData.taxpayers[index].__v || 0) + 1
  };

  await fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2));
  return jsonData.taxpayers[index];
}

// Delete a taxpayer
export async function deleteTaxpayer(id: string) {
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  const jsonData = JSON.parse(data);

  const index = jsonData.taxpayers.findIndex((t: Record<string, unknown>) => t._id === id);
  if (index === -1) return false;

  jsonData.taxpayers.splice(index, 1);
  await fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2));
  return true;
}
