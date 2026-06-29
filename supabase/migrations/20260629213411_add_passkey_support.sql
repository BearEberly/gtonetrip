create table if not exists public.passkey_credentials (
  credential_id text primary key,
  person_id text not null,
  family_id text not null,
  rp_id text not null,
  public_key text not null,
  counter bigint not null default 0,
  transports jsonb not null default '[]'::jsonb,
  device_type text not null default 'singleDevice',
  backed_up boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_used_at timestamptz
);

create index if not exists passkey_credentials_person_rp_idx
  on public.passkey_credentials (person_id, rp_id);

create table if not exists public.passkey_challenges (
  challenge text primary key,
  flow text not null,
  person_id text,
  family_id text,
  rp_id text not null,
  origin text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists passkey_challenges_expires_idx
  on public.passkey_challenges (expires_at);

alter table public.passkey_credentials enable row level security;
alter table public.passkey_challenges enable row level security;

revoke all on public.passkey_credentials from anon, authenticated;
revoke all on public.passkey_challenges from anon, authenticated;
