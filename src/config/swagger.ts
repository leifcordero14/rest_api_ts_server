import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: {
      title: "REST API Node.js / Express / Typescript",
      version: "1.0.0",
      description: "API docs for products"
    },
    openapi: "3.1.0",
    tags: [{ name: "Products", description: "API operations related to products." }]
  },
  apis: ["./src/router.ts"]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
