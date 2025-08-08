import { useState } from "react";
import { Input } from "@/components/ui/input";

interface ClozeData {
  text: string;
  answers: string[];
}

interface ClozeQuestionProps {
  data: ClozeData;
}

export const ClozeQuestion = ({ data }: ClozeQuestionProps) => {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  // Split text and replace [blank] with input fields
  const renderTextWithBlanks = () => {
    const parts = data.text.split('[blank]');
    const elements = [];
    
    for (let i = 0; i < parts.length; i++) {
      // Add text part
      if (parts[i]) {
        elements.push(
          <span key={`text-${i}`} className="text-base leading-relaxed">
            {parts[i]}
          </span>
        );
      }
      
      // Add input field if not the last part
      if (i < parts.length - 1) {
        elements.push(
          <Input
            key={`blank-${i}`}
            value={userAnswers[i] || ''}
            onChange={(e) => updateAnswer(i, e.target.value)}
            className="inline-block w-32 mx-1 h-8"
            placeholder="?"
          />
        );
      }
    }
    
    return elements;
  };

  return (
    <div className="space-y-4">
      <div className="text-base leading-relaxed bg-muted/30 p-4 rounded-lg">
        {renderTextWithBlanks()}
      </div>
      
      <div className="text-sm text-muted-foreground">
        Fill in the blanks with appropriate words or phrases.
      </div>
    </div>
  );
};