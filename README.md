Developing a crawler and building an API
On the following URL, you will find a client's directory:

https://bit.ly/3lmNMTA

You have to develop a crawler and build API using Node.js that will:

Parse the page to extract all the clients; 
Validate the fields as follows: 
CIN should be exactly 21 digits
PIN should be exactly 6 digits
move to the next page;
 
Store client information in a database.
 
Build API to expose the following features:
API Endpoints:

 

Endpoint	Description
GET clients/	List out all clients
POST clients/	Create a new client
GET clients/[id]	Show one client
POST clients/[id]	Update a client
DELETE clients/[id]	Delete a client
GET clients?q=[term]	Search for a client (based on id/ name/ CIN/ email)
 

Design the front end using Bootstrap and preferably Vue.js to consume the APIs and display the responses.
 

Guidelines:

Node.js + database using MySQL and Elasticsearch
JSON API response
ASYNC pattern, Error Handling
High-quality architecture
Well-structured code
Push the code to Gitlab or Github and share the link with us.