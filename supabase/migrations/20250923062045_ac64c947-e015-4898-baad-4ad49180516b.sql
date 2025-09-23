-- Create services table for providers
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID NOT NULL,
  name TEXT NOT NULL,
  service_type TEXT NOT NULL,
  description TEXT,
  price_per_day DECIMAL(10,2),
  price_currency TEXT DEFAULT 'INR',
  location TEXT NOT NULL,
  state TEXT NOT NULL,
  max_group_size INTEGER DEFAULT 10,
  duration_days INTEGER DEFAULT 1,
  includes TEXT[],
  excludes TEXT[],
  image_urls TEXT[],
  availability_status TEXT DEFAULT 'active' CHECK (availability_status IN ('active', 'inactive', 'pending_approval')),
  approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL,
  provider_id UUID NOT NULL,
  traveler_id UUID NOT NULL,
  booking_date DATE NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  group_size INTEGER NOT NULL DEFAULT 1,
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  booking_status TEXT DEFAULT 'pending' CHECK (booking_status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  special_requests TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on services table
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Enable RLS on bookings table  
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS policies for services
CREATE POLICY "Providers can view their own services"
ON public.services
FOR SELECT
USING (provider_id = auth.uid());

CREATE POLICY "Providers can create their own services"
ON public.services
FOR INSERT
WITH CHECK (provider_id = auth.uid());

CREATE POLICY "Providers can update their own services"
ON public.services
FOR UPDATE
USING (provider_id = auth.uid());

CREATE POLICY "Travelers can view approved services"
ON public.services
FOR SELECT
USING (approval_status = 'approved' AND availability_status = 'active');

-- RLS policies for bookings
CREATE POLICY "Providers can view their own bookings"
ON public.bookings
FOR SELECT
USING (provider_id = auth.uid());

CREATE POLICY "Travelers can view their own bookings"
ON public.bookings
FOR SELECT
USING (traveler_id = auth.uid());

CREATE POLICY "Travelers can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (traveler_id = auth.uid());

CREATE POLICY "Providers can update booking status"
ON public.bookings
FOR UPDATE
USING (provider_id = auth.uid());

-- Add foreign key constraints
ALTER TABLE public.services
ADD CONSTRAINT fk_services_provider
FOREIGN KEY (provider_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.bookings
ADD CONSTRAINT fk_bookings_service
FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE;

ALTER TABLE public.bookings
ADD CONSTRAINT fk_bookings_provider
FOREIGN KEY (provider_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.bookings
ADD CONSTRAINT fk_bookings_traveler
FOREIGN KEY (traveler_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create updated_at triggers
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_services_provider_id ON public.services(provider_id);
CREATE INDEX idx_services_approval_status ON public.services(approval_status);
CREATE INDEX idx_services_location ON public.services(location);
CREATE INDEX idx_bookings_provider_id ON public.bookings(provider_id);
CREATE INDEX idx_bookings_traveler_id ON public.bookings(traveler_id);
CREATE INDEX idx_bookings_service_id ON public.bookings(service_id);
CREATE INDEX idx_bookings_booking_date ON public.bookings(booking_date);