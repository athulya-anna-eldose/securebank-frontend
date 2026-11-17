
import api from "./api";

export interface SecurityEvent {
  id: number;
  eventType: string;
  severity: string;
  description: string;
  email: string | null;
  ipAddress: string | null;
  endpoint: string | null;
  httpMethod: string | null;
  eventTime: string;
  
}

export interface SecuritySummary {
  totalEvents: number;
  highSeverityEvents: number;
  unauthorizedAccessAttempts: number;
  invalidJwtAttempts: number;
  sqlInjectionAttempts: number;
  xssAttempts: number;
}

const securityService = {
  getEvents: async (): Promise<SecurityEvent[]> => {
    const response = await api.get<SecurityEvent[]>("/api/security/events");
    return response.data;
  },

  getSummary: async (): Promise<SecuritySummary> => {
    const response = await api.get<SecuritySummary>("/api/security/summary");
    return response.data;
  },
};

export default securityService;
