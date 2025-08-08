import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Question } from "@/pages/Index";
import { CategorizeBuilder } from "./questions/CategorizeBuilder";
import { ClozeBuilder } from "./questions/ClozeBuilder";
import { ComprehensionBuilder } from "./questions/ComprehensionBuilder";
import { Image, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface QuestionBuilderProps {
  question: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

export const QuestionBuilder = ({ question, onUpdate }: QuestionBuilderProps) => {
  const handleTitleChange = (title: string) => {
    onUpdate({ title });
  };

  const handleImageChange = (image: string) => {
    onUpdate({ image });
  };

  const handleDataChange = (data: any) => {
    onUpdate({ data });
  };

  const removeImage = () => {
    onUpdate({ image: undefined });
  };

  return (
    <div className="space-y-6">
      {/* Basic Question Info */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="question-title">Question Title</Label>
          <Input
            id="question-title"
            value={question.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="mt-1"
            placeholder="Enter your question title..."
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <Label>Question Image</Label>
          <div className="flex items-center gap-2">
            {question.image ? (
              <div className="relative">
                <img 
                  src={question.image} 
                  alt="Question" 
                  className="w-32 h-20 object-cover rounded-lg border"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-6 h-6 p-0"
                  onClick={removeImage}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Image className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Question Image</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Label>Image URL</Label>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const target = e.target as HTMLInputElement;
                          handleImageChange(target.value);
                          // Close dialog by triggering escape
                          e.preventDefault();
                        }
                      }}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter an image URL and press Enter to add it
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>

      {/* Question Type Specific Builder */}
      <div className="border-t pt-4">
        {question.type === 'categorize' && (
          <CategorizeBuilder data={question.data} onChange={handleDataChange} />
        )}
        {question.type === 'cloze' && (
          <ClozeBuilder data={question.data} onChange={handleDataChange} />
        )}
        {question.type === 'comprehension' && (
          <ComprehensionBuilder data={question.data} onChange={handleDataChange} />
        )}
      </div>
    </div>
  );
};