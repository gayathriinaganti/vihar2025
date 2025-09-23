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

    console.log('Fetching stats for provider:', user.id);

    // Get total services count
    const { count: totalServices, error: servicesError } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true })
      .eq('provider_id', user.id);

    if (servicesError) {
      console.error('Error fetching services:', servicesError);
      throw servicesError;
    }

    // Get pending approval services count
    const { count: pendingApproval, error: pendingError } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true })
      .eq('provider_id', user.id)
      .eq('approval_status', 'pending');

    if (pendingError) {
      console.error('Error fetching pending services:', pendingError);
      throw pendingError;
    }

    // Get total bookings count
    const { count: totalBookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('provider_id', user.id);

    if (bookingsError) {
      console.error('Error fetching bookings:', bookingsError);
      throw bookingsError;
    }

    // Get confirmed bookings count
    const { count: confirmedBookings, error: confirmedError } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('provider_id', user.id)
      .eq('booking_status', 'confirmed');

    if (confirmedError) {
      console.error('Error fetching confirmed bookings:', confirmedError);
      throw confirmedError;
    }

    // Calculate total revenue from completed bookings
    const { data: revenueData, error: revenueError } = await supabase
      .from('bookings')
      .select('total_amount')
      .eq('provider_id', user.id)
      .eq('booking_status', 'completed')
      .eq('payment_status', 'paid');

    if (revenueError) {
      console.error('Error fetching revenue:', revenueError);
      throw revenueError;
    }

    const totalRevenue = revenueData?.reduce((sum, booking) => sum + (booking.total_amount || 0), 0) || 0;

    // Get recent bookings
    const { data: recentBookings, error: recentError } = await supabase
      .from('bookings')
      .select(`
        id,
        booking_date,
        start_date,
        end_date,
        group_size,
        total_amount,
        booking_status,
        payment_status,
        contact_email,
        services (
          name,
          location
        )
      `)
      .eq('provider_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (recentError) {
      console.error('Error fetching recent bookings:', recentError);
      throw recentError;
    }

    const stats = {
      totalServices: totalServices || 0,
      pendingApproval: pendingApproval || 0,
      totalBookings: totalBookings || 0,
      confirmedBookings: confirmedBookings || 0,
      totalRevenue: totalRevenue,
      recentBookings: recentBookings || []
    };

    console.log('Provider stats calculated:', stats);

    return new Response(JSON.stringify(stats), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in provider-stats function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});