-- Enable RLS on remaining tables that need it
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create policies for audit_logs (admin/analyst access only)
CREATE POLICY "Admins can view all audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'analyst')
  )
);

-- Create policies for chunks (users can view their own document chunks)
CREATE POLICY "Users can view chunks from their documents" 
ON public.chunks 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.documents 
    WHERE id = chunks.document_id AND user_id = auth.uid()
  )
);

-- Create policies for sessions (users can view their own sessions)
CREATE POLICY "Users can view their own sessions" 
ON public.sessions 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can create their own sessions" 
ON public.sessions 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

-- Create policies for settings (admins only)
CREATE POLICY "Admins can manage settings" 
ON public.settings 
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "All users can read public settings" 
ON public.settings 
FOR SELECT 
USING (key LIKE 'public.%');