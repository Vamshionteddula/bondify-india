import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, File, Search, MessageSquare, Download, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface Document {
  id: string;
  name: string;
  path: string;
  embedding_ready: boolean;
  created_at: string;
  user_id: string;
}

export default function Documents() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [searching, setSearching] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      fetchDocuments();
    }
  }, [user]);

  const fetchDocuments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Error",
        description: "Only PDF and Word documents are supported",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 10MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Upload file to Supabase Storage
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      setUploadProgress(50);

      // Create document record
      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          name: file.name,
          path: fileName,
          embedding_ready: false
        });

      if (dbError) throw dbError;

      setUploadProgress(100);
      
      toast({
        title: "Success",
        description: "Document uploaded successfully. Processing for search...",
      });

      fetchDocuments();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDocumentSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      // Simulate document search and AI response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResponse = `Based on your uploaded documents, here are the relevant findings for "${searchQuery}":

1. Risk Assessment Framework: Documents mention compliance with SEBI guidelines for risk evaluation.

2. Investment Criteria: The documents outline specific criteria for bond selection and evaluation.

3. Regulatory Compliance: Multiple references to regulatory requirements and adherence to SEBI norms.

Please note: This is a simulated response. In a production environment, this would query your actual documents using vector embeddings and provide real citations.`;

      setSearchResults(mockResponse);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to search documents",
        variant: "destructive",
      });
    } finally {
      setSearching(false);
    }
  };

  const handleDeleteDocument = async (document: Document) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([document.path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', document.id);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Document deleted successfully",
      });

      fetchDocuments();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('documents.title')}</h1>
        <p className="text-muted-foreground mt-2">Upload, search, and analyze your financial documents</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>{t('documents.upload')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div 
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">{t('documents.supportedFormats')}</p>
              <p className="text-sm text-muted-foreground">{t('documents.maxSize')}</p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>{t('documents.search')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDocumentSearch} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('documents.askQuestion')}
                className="flex-1"
              />
              <Button type="submit" disabled={searching || !searchQuery.trim()}>
                {searching ? (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <MessageSquare className="w-4 h-4" />
                )}
              </Button>
            </div>

            {searchResults && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">AI Analysis Results:</h4>
                <pre className="whitespace-pre-wrap text-sm">{searchResults}</pre>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-8">
              <File className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((document) => (
                <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <File className="w-8 h-8 text-primary" />
                    <div>
                      <h4 className="font-medium">{document.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Uploaded {new Date(document.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant={document.embedding_ready ? "default" : "secondary"}>
                      {document.embedding_ready ? "Ready for search" : "Processing..."}
                    </Badge>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDocument(document)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}