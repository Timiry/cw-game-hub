export type ServerVisibility = "PUBLIC" | "PRIVATE" | "HIDDEN" | "DISABLED";

export interface Server {
  id: string;
  name: string;
  description?: string;
  address: string;
  visibility: ServerVisibility;
}

export interface ServersResponse {
  content: Server[];
}

export interface ServerInfo {
  name: string;
  forbidden: boolean;
  description?: string;
  online?: number;
}
