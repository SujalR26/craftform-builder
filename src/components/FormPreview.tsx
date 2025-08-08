import { FormData } from "@/pages/Index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategorizeQuestion } from "./questions/CategorizeQuestion";
import { ClozeQuestion } from "./questions/ClozeQuestion";
import { ComprehensionQuestion } from "./questions/ComprehensionQuestion";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface FormPreviewProps {
  formData: FormData;
}

export const FormPreview = ({ formData }: FormPreviewProps) => {
  const handleSubmit = () => {
    // In a real app, this would submit the form responses
    console.log('Form submitted');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Form Header */}
      <div className="text-center mb-8">
        {formData.headerImage && (
          <img 
            src={formData.headerImage} 
            alt="Form Header" 
            className="w-full h-48 object-cover rounded-lg mb-6 shadow-medium"
          />
        )}
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          {formData.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {formData.description}
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-8">
        {formData.questions.map((question, index) => (
          <Card key={question.id} className="bg-white shadow-soft border-0 overflow-hidden">
            <CardHeader className="bg-gradient-card">
              <CardTitle className="flex items-center gap-3">
                <span className="bg-form-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                {question.title}
              </CardTitle>
              {question.image && (
                <img 
                  src={question.image} 
                  alt="Question" 
                  className="w-full max-w-md h-32 object-cover rounded-lg mt-4"
                />
              )}
            </CardHeader>
            <CardContent className="p-6">
              {question.type === 'categorize' && (
                <CategorizeQuestion data={question.data} />
              )}
              {question.type === 'cloze' && (
                <ClozeQuestion data={question.data} />
              )}
              {question.type === 'comprehension' && (
                <ComprehensionQuestion data={question.data} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submit Button */}
      {formData.questions.length > 0 && (
        <div className="mt-8 text-center">
          <Button onClick={handleSubmit} size="lg" className="bg-gradient-primary text-white hover:opacity-90">
            <Send className="w-5 h-5 mr-2" />
            Submit Form
          </Button>
        </div>
      )}

      {/* Empty State */}
      {formData.questions.length === 0 && (
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="py-12 text-center">
            <h3 className="text-xl font-semibold mb-2">Preview Mode</h3>
            <p className="text-muted-foreground">Add questions in the builder tab to see them here</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};