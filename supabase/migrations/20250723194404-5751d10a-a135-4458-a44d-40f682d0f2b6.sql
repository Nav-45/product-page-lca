-- Add product_id to lca_classification table to link value chain activities to products
ALTER TABLE public.lca_classification 
ADD COLUMN product_id UUID REFERENCES public.products(id);

-- Create index for better performance
CREATE INDEX idx_lca_classification_product_id ON public.lca_classification(product_id);

-- Add RLS policies for user access
CREATE POLICY "Users can view their own product lca data" 
ON public.lca_classification 
FOR SELECT 
USING (
  product_id IN (
    SELECT id FROM public.products WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert lca data for their own products" 
ON public.lca_classification 
FOR INSERT 
WITH CHECK (
  product_id IN (
    SELECT id FROM public.products WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can update lca data for their own products" 
ON public.lca_classification 
FOR UPDATE 
USING (
  product_id IN (
    SELECT id FROM public.products WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete lca data for their own products" 
ON public.lca_classification 
FOR DELETE 
USING (
  product_id IN (
    SELECT id FROM public.products WHERE user_id = auth.uid()
  )
);

-- Enable RLS on lca_classification table
ALTER TABLE public.lca_classification ENABLE ROW LEVEL SECURITY;