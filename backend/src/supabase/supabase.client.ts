import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

let supabase: any;

export const initSupabase = (configService: ConfigService) => {
  supabase = createClient(
    configService.get<string>('NEXT_PUBLIC_SUPABASE_URL')!,
    configService.get<string>('SUPABASE_ANON_KEY')!,
  );

  return supabase;
};

export { supabase };