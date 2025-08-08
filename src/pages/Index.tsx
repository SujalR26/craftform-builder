import { useState } from "react";
import { FormBuilder } from "@/components/FormBuilder";
import { FormPreview } from "@/components/FormPreview";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Edit3, Save, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Question {
  id: string;
  type: 'categorize' | 'cloze' | 'comprehension';
  title: string;
  image?: string;
  data: any;
}

export interface FormData {
  id: string;
  title: string;
  description: string;
  headerImage?: string;
  questions: Question[];
}

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("builder");
  const [formData, setFormData] = useState<FormData>({
    id: '1',
    title: 'Untitled Form',
    description: 'Create engaging forms with custom question types',
    questions: []
  });

  const handleSaveForm = () => {
    // In a real app, this would save to backend
    toast({
      title: "Form Saved",
      description: "Your form has been saved successfully.",
    });
  };

  const handleShareForm = () => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(window.location.origin + '/form/' + formData.id);
    toast({
      title: "Link Copied",
      description: "Form link has been copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">CraftForm Builder</h1>
              <div className="text-white/80 text-sm">
                {formData.title}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleSaveForm} className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={handleShareForm} className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white/95 backdrop-blur-sm shadow-large border-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b bg-gradient-card px-6 py-4">
              <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/50">
                <TabsTrigger value="builder" className="data-[state=active]:bg-form-primary data-[state=active]:text-white">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Builder
                </TabsTrigger>
                <TabsTrigger value="preview" className="data-[state=active]:bg-form-primary data-[state=active]:text-white">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="builder" className="mt-0">
              <FormBuilder formData={formData} setFormData={setFormData} />
            </TabsContent>

            <TabsContent value="preview" className="mt-0">
              <FormPreview formData={formData} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Index;