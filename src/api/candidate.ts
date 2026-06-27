import { api } from "@/lib/api";
import { API_ENDPOINTS } from "@/constants/endpoint";

export type Candidate = {
  name: string;
  part: string;
  team: string;
};

type CandidatesResponse = {
  success: boolean;
  data: Candidate[] | null;
  error: {
    status: number;
    code: string;
    message: string;
  } | null;
};

type CandidatesParams = {
  part?: string;
  team?: string;
};

export async function getCandidates(
  params: CandidatesParams = {},
): Promise<CandidatesResponse> {
  const { data } = await api.get<CandidatesResponse>(API_ENDPOINTS.CANDIDATES, {
    params,
  });
  return data;
}
