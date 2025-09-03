import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Plus, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface Grievance {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  locale: string;
  created_at: string;
  updated_at: string;
}

export default function Grievances() {
  const { t } = useTranslation();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium'
  });

  useEffect(() => {
    if (user) {
      fetchGrievances();
      
      // Set up realtime subscription
      const channel = supabase
        .channel('grievances-changes')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'grievances',
            filter: `user_id=eq.${user.id}`
          }, 
          (payload) => {
            console.log('Grievance updated:', payload);
            fetchGrievances(); // Refresh list on any change
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchGrievances = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('grievances')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGrievances(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('grievances')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          priority: formData.priority,
          locale: profile.locale,
          status: 'open'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Grievance filed successfully",
      });

      setFormData({ title: '', description: '', category: '', priority: 'medium' });
      setShowForm(false);
      fetchGrievances();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'inProgress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('grievances.title')}</h1>
          <p className="text-muted-foreground mt-2">File and track your grievances</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          {t('grievances.fileGrievance')}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{t('grievances.fileGrievance')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">{t('grievances.grievanceTitle')}</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  placeholder="Enter grievance title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">{t('grievances.category')}</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fraud">{t('grievances.categories.fraud')}</SelectItem>
                    <SelectItem value="trading">{t('grievances.categories.trading')}</SelectItem>
                    <SelectItem value="platform">{t('grievances.categories.platform')}</SelectItem>
                    <SelectItem value="compliance">{t('grievances.categories.compliance')}</SelectItem>
                    <SelectItem value="other">{t('grievances.categories.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">{t('grievances.priority')}</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{t('grievances.priorities.low')}</SelectItem>
                    <SelectItem value="medium">{t('grievances.priorities.medium')}</SelectItem>
                    <SelectItem value="high">{t('grievances.priorities.high')}</SelectItem>
                    <SelectItem value="urgent">{t('grievances.priorities.urgent')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t('grievances.description')}</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={4}
                  placeholder="Describe your grievance in detail"
                />
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={loading}>
                  {loading ? t('common.loading') : t('common.submit')}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  {t('common.cancel')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-4">{t('grievances.myGrievances')}</h2>
        
        {grievances.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No grievances filed yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {grievances.map((grievance) => (
              <Card key={grievance.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg">{grievance.title}</h3>
                    <div className="flex space-x-2">
                      <Badge className={getPriorityColor(grievance.priority)}>
                        {t(`grievances.priorities.${grievance.priority}`)}
                      </Badge>
                      <Badge className={getStatusColor(grievance.status)}>
                        {t(`grievances.statuses.${grievance.status}`)}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{grievance.description}</p>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span>Category: {t(`grievances.categories.${grievance.category}`)}</span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(grievance.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {grievance.status === 'resolved' && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Resolved
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}