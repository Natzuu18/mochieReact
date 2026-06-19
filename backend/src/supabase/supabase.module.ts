import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

export const SUPABASE = 'SUPABASE';

@Global()
@Module({
  providers: [
    {
      provide: SUPABASE,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url =
          config.get<string>('SUPABASE_URL') ??
          config.get<string>('NEXT_PUBLIC_SUPABASE_URL');
        const key = config.get<string>('SUPABASE_ANON_KEY');

        if (!url || !key) {
          throw new Error('Missing Supabase environment variables');
        }

        return createClient(url, key);
      },
    },
  ],
  exports: [SUPABASE],
})
export class SupabaseModule {}
