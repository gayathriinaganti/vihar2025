-- Create storage bucket for provider verification documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'provider-documents',
  'provider-documents',
  false,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
);

-- Create table for provider verification documents
CREATE TABLE public.provider_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID NOT NULL REFERENCES public.providers(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('business_license', 'id_proof', 'service_certificate', 'business_photo')),
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.provider_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for provider_documents
CREATE POLICY "Providers can view their own documents"
ON public.provider_documents
FOR SELECT
USING (provider_id IN (SELECT id FROM public.providers WHERE user_id = auth.uid()));

CREATE POLICY "Providers can insert their own documents"
ON public.provider_documents
FOR INSERT
WITH CHECK (provider_id IN (SELECT id FROM public.providers WHERE user_id = auth.uid()));

CREATE POLICY "Providers can delete their own documents"
ON public.provider_documents
FOR DELETE
USING (provider_id IN (SELECT id FROM public.providers WHERE user_id = auth.uid()));

-- Add trigger for updated_at
CREATE TRIGGER update_provider_documents_updated_at
BEFORE UPDATE ON public.provider_documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage policies for provider-documents bucket
CREATE POLICY "Providers can upload their own documents"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'provider-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Providers can view their own documents"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'provider-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Providers can update their own documents"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'provider-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Providers can delete their own documents"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'provider-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Add indexes for better performance
CREATE INDEX idx_provider_documents_provider_id ON public.provider_documents(provider_id);
CREATE INDEX idx_provider_documents_document_type ON public.provider_documents(document_type);
CREATE INDEX idx_provider_documents_verification_status ON public.provider_documents(verification_status);