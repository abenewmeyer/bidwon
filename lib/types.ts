export type Opportunity = {
  id: string;
  notice_id: string;
  title: string;
  agency: string;
  posted_date: string;
  response_deadline: string;
  type_of_set_aside: string;
  naics_code: string;
  match_score: number;
  ai_summary: string;
  eligibility_checklist: string;
  risk_flags: string;
  raw_json: any;
  status: "new" | "reviewed" | "approved" | "bid_submitted";
  created_at: string;
};

export type CompanyProfile = {
  id: string;
  user_id: string;
  company_name: string;
  uei: string;
  naics_codes: string[];
  set_asides: string[];
  keywords: string[];
  psc_codes: string[];
  capability_statement: string;
};
