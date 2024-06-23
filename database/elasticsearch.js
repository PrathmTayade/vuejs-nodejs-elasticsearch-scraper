import { Client } from "@elastic/elasticsearch";

const elasticsearchConfig = { node: "http://elasticsearch:9200" }; // Use container name if using Docker Compose

export async function connectToElasticsearch() {
  try {
    const client = new Client(elasticsearchConfig);
    return client;
  } catch (error) {
    console.error("Error connecting to Elasticsearch:", error);
    throw error; // Re-throw for handling in main script
  }
}
