-- Add state column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN state TEXT;

-- Create states table
CREATE TABLE public.states (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create places table for state-wise places
CREATE TABLE public.places (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  state_id UUID NOT NULL REFERENCES public.states(id) ON DELETE CASCADE,
  description TEXT,
  place_type TEXT NOT NULL, -- temple, tourist_spot, pilgrimage_site, etc.
  location TEXT,
  image_url TEXT,
  rating DECIMAL(2,1),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;

-- Create policies for states (public read access)
CREATE POLICY "Everyone can view states" 
ON public.states 
FOR SELECT 
USING (true);

-- Create policies for places (public read access)
CREATE POLICY "Everyone can view places" 
ON public.places 
FOR SELECT 
USING (true);

-- Insert Andhra Pradesh and some initial places
INSERT INTO public.states (name, code) VALUES 
('Andhra Pradesh', 'AP');

-- Get the state ID for Andhra Pradesh
INSERT INTO public.places (name, state_id, description, place_type, location, rating) 
SELECT 
  place_name,
  s.id,
  place_description,
  place_type,
  place_location,
  place_rating
FROM public.states s,
(VALUES 
  ('Tirupati Balaji Temple', 'Famous temple dedicated to Lord Venkateswara, one of the most visited pilgrimage sites in India', 'temple', 'Tirupati, Chittoor District', 4.8),
  ('Srisailam Temple', 'Ancient temple dedicated to Lord Mallikarjuna, one of the twelve Jyotirlingas', 'temple', 'Srisailam, Kurnool District', 4.7),
  ('Simhachalam Temple', 'Historic temple dedicated to Lord Narasimha', 'temple', 'Visakhapatnam District', 4.6),
  ('Araku Valley', 'Beautiful hill station known for coffee plantations and scenic beauty', 'tourist_spot', 'Visakhapatnam District', 4.5),
  ('Horsley Hills', 'Serene hill station perfect for nature lovers', 'tourist_spot', 'Chittoor District', 4.3),
  ('Lepakshi Temple', 'Historic temple known for its architecture and hanging pillar', 'temple', 'Anantapur District', 4.4)
) AS places_data(place_name, place_description, place_type, place_location, place_rating)
WHERE s.code = 'AP';

-- Create trigger for updating timestamps
CREATE TRIGGER update_states_updated_at
BEFORE UPDATE ON public.states
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_places_updated_at
BEFORE UPDATE ON public.places
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();