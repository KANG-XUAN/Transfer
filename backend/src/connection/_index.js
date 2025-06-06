// src/connection/_index.js

// 根據.env設定自動選擇資料庫
require('dotenv').config();

let db;

switch (process.env.DB_TYPE) {
  case 'azure':
    db = require('./azureConfig');
    break;
  case 'railway':
    db = require('./railwayConfig');
    break;
  default:
    throw new Error(`Unknown DB_TYPE: ${process.env.DB_TYPE}`);
}

module.exports = db;
