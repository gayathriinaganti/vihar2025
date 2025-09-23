import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user from JWT
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const method = req.method;
    const url = new URL(req.url);
    const bookingId = url.searchParams.get('id');

    switch (method) {
      case 'GET':
        if (bookingId) {
          // Get single booking
          const { data: booking, error } = await supabase
            .from('bookings')
            .select(`
              *,
              services (
                name,
                location,
                service_type
              )
            `)
            .eq('id', bookingId)
            .eq('provider_id', user.id)
            .single();

          if (error) {
            console.error('Error fetching booking:', error);
            throw error;
          }

          return new Response(JSON.stringify(booking), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          // Get all provider bookings with pagination
          const page = parseInt(url.searchParams.get('page') || '1');
          const limit = parseInt(url.searchParams.get('limit') || '20');
          const status = url.searchParams.get('status');
          const from = (page - 1) * limit;
          const to = from + limit - 1;

          let query = supabase
            .from('bookings')
            .select(`
              *,
              services (
                name,
                location,
                service_type
              )
            `, { count: 'exact' })
            .eq('provider_id', user.id);

          if (status) {
            query = query.eq('booking_status', status);
          }

          const { data: bookings, error, count } = await query
            .range(from, to)
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error fetching bookings:', error);
            throw error;
          }

          return new Response(JSON.stringify({
            bookings: bookings || [],
            total: count || 0,
            page,
            limit,
            totalPages: Math.ceil((count || 0) / limit)
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

      case 'PUT':
        // Update booking status
        if (!bookingId) {
          throw new Error('Booking ID is required for updates');
        }

        const updateData = await req.json();
        const { data: updatedBooking, error: updateError } = await supabase
          .from('bookings')
          .update(updateData)
          .eq('id', bookingId)
          .eq('provider_id', user.id)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating booking:', updateError);
          throw updateError;
        }

        console.log('Booking updated:', updatedBooking);
        return new Response(JSON.stringify(updatedBooking), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      default:
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

  } catch (error: any) {
    console.error('Error in provider-bookings function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});