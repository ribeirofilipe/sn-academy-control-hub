import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface SearchByEmailProps {
  onEmailSelect: (emails: string[]) => void;
}

export const SearchByEmail = ({ onEmailSelect }: SearchByEmailProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: emails, isLoading } = useQuery({
    queryKey: ['search-emails', debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch.trim()) return [];
      
      const { data, error } = await supabase
        .from('alunas_hotmart')
        .select('email')
        .ilike('email', `%${debouncedSearch}%`)
        .limit(10);

      if (error) throw error;
      
      const uniqueEmails = [...new Set(data?.map(item => item.email))];
      return uniqueEmails;
    },
    enabled: debouncedSearch.length > 2,
  });

  useEffect(() => {
    if (emails) {
      onEmailSelect(emails);
    }
  }, [emails, onEmailSelect]);

  return (
    <div className="space-y-2">
      <Label>Buscar por E-mail</Label>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Digite o e-mail da aluna..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      {isLoading && searchTerm && (
        <p className="text-sm text-muted-foreground">Buscando...</p>
      )}
    </div>
  );
};