-- First, drop the existing check constraint if it exists
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS valid_role_check;

-- Update existing pilgrim roles to traveler FIRST (before adding constraint)
UPDATE public.profiles 
SET role = 'traveler' 
WHERE role = 'pilgrim';

-- Now add a check constraint that includes only the current valid roles
ALTER TABLE public.profiles 
ADD CONSTRAINT valid_role_check 
CHECK (role IN ('traveler', 'provider', 'admin'));

-- Update the profiles table default role from 'pilgrim' to 'traveler'
ALTER TABLE public.profiles 
ALTER COLUMN role SET DEFAULT 'traveler'::text;

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