import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmailResultsProps {
  emails: string[];
  selectedEmail: string | null;
  onEmailSelect: (email: string) => void;
}

export const EmailResults = ({ emails, selectedEmail, onEmailSelect }: EmailResultsProps) => {
  if (emails.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">E-mails encontrados:</h3>
        <div className="space-y-2">
          {emails.map((email) => (
            <Button
              key={email}
              variant={selectedEmail === email ? "default" : "outline"}
              className="w-full justify-start text-left"
              onClick={() => onEmailSelect(email)}
            >
              {email}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};