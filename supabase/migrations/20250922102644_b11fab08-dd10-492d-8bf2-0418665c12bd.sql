-- Update the profiles table default role from 'pilgrim' to 'traveler'
ALTER TABLE public.profiles 
ALTER COLUMN role SET DEFAULT 'traveler'::text;

-- Update existing pilgrim roles to traveler
UPDATE public.profiles 
SET role = 'traveler' 
WHERE role = 'pilgrim';

-- Rename pilgrimage_requests table to travel_requests for consistency
ALTER TABLE public.pilgrimage_requests 
RENAME TO travel_requests;

-- Update the handle_new_user function to use 'traveler' as default role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, role)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data ->> 'display_name',
    COALESCE(NEW.raw_user_meta_data ->> 'user_role', 'traveler')
  );
  RETURN NEW;
END;
$function$;