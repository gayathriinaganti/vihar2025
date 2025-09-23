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
    const serviceId = url.searchParams.get('id');

    switch (method) {
      case 'GET':
        if (serviceId) {
          // Get single service
          const { data: service, error } = await supabase
            .from('services')
            .select('*')
            .eq('id', serviceId)
            .eq('provider_id', user.id)
            .single();

          if (error) {
            console.error('Error fetching service:', error);
            throw error;
          }

          return new Response(JSON.stringify(service), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          // Get all provider services
          const { data: services, error } = await supabase
            .from('services')
            .select('*')
            .eq('provider_id', user.id)
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error fetching services:', error);
            throw error;
          }

          return new Response(JSON.stringify(services || []), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

      case 'POST':
        // Create new service
        const newServiceData = await req.json();
        const { data: newService, error: createError } = await supabase
          .from('services')
          .insert([{
            ...newServiceData,
            provider_id: user.id,
            approval_status: 'pending',
            availability_status: 'active'
          }])
          .select()
          .single();

        if (createError) {
          console.error('Error creating service:', createError);
          throw createError;
        }

        console.log('Service created:', newService);
        return new Response(JSON.stringify(newService), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'PUT':
        // Update service
        if (!serviceId) {
          throw new Error('Service ID is required for updates');
        }

        const updateData = await req.json();
        const { data: updatedService, error: updateError } = await supabase
          .from('services')
          .update(updateData)
          .eq('id', serviceId)
          .eq('provider_id', user.id)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating service:', updateError);
          throw updateError;
        }

        console.log('Service updated:', updatedService);
        return new Response(JSON.stringify(updatedService), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'DELETE':
        // Delete service
        if (!serviceId) {
          throw new Error('Service ID is required for deletion');
        }

        const { error: deleteError } = await supabase
          .from('services')
          .delete()
          .eq('id', serviceId)
          .eq('provider_id', user.id);

        if (deleteError) {
          console.error('Error deleting service:', deleteError);
          throw deleteError;
        }

        console.log('Service deleted:', serviceId);
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      default:
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

  } catch (error: any) {
    console.error('Error in provider-services function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});