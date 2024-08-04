import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

// Import service definition that you want to connect to.
// import { ElizaService } from "@buf/connectrpc_eliza.connectrpc_es/connectrpc/eliza/v1/eliza_connect";
import { AdManagementService } from "@/app/gen/rpc/ads/v1/ads_connect";
import { OrganizationService } from "@/app/gen/rpc/organization/v1/organization_connect";


// The transport defines what type of endpoint we're hitting.
// In our example we'll be communicating with a Connect endpoint.
// If your endpoint only supports gRPC-web, make sure to use
// `createGrpcWebTransport` instead.
const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});

// Here we make the client itself, combining the service
// definition with the transport.
export const clientAds = createPromiseClient(AdManagementService, transport);
export const clientOrganization = createPromiseClient(OrganizationService, transport);
