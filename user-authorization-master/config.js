// Get the config either from environment variables or pick the default
const config = {
  PORT: process.env.PORT || "3000",
  CLIENT_ID: process.env.CLIENT_ID || "4e413e5ff0ab8a97d077",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "969466317cd444098c71d0aece12fa8bff557559"  
}

module.exports = config;
