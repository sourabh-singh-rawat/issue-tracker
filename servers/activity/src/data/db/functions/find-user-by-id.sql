DROP FUNCTION IF EXISTS find_user_by_id;
CREATE OR REPLACE FUNCTION find_user_by_id (
  p_id UUID
)
RETURNS TABLE (
  id UUID,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  is_email_verified BOOLEAN,
  default_workspace_id uuid,
  "version" INTEGER
)
LANGUAGE PLPGSQL AS $$
  BEGIN      
    RETURN QUERY 
      SELECT 
        u.id, 
        u.email, 
        u.created_at, 
        u.is_email_verified,
        u.default_workspace_id,
        u.version
      FROM users AS u
      WHERE u.id = p_id
      LIMIT 1;
  END;
$$