import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface ComprehensionQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface ComprehensionData {
  passage: string;
  questions: ComprehensionQuestion[];
}

interface ComprehensionQuestionProps {
  data: ComprehensionData;
}

export const ComprehensionQuestion = ({ data }: ComprehensionQuestionProps) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Reading Passage */}
      <Card className="p-6 bg-muted/30 border-0">
        <h4 className="font-semibold mb-4 text-form-primary">Reading Passage</h4>
        <div className="text-base leading-relaxed whitespace-pre-wrap">
          {data.passage}
        </div>
      </Card>

      {/* Questions */}
      <div className="space-y-6">
        {data.questions.map((question, questionIndex) => (
          <Card key={questionIndex} className="p-6 bg-gradient-card border-0 shadow-soft">
            <h5 className="font-semibold mb-4 text-lg">
              {questionIndex + 1}. {question.question}
            </h5>
            
            <RadioGroup
              value={answers[questionIndex] || ''}
              onValueChange={(value) => handleAnswerChange(questionIndex, value)}
              className="space-y-3"
            >
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-3">
                  <RadioGroupItem 
                    value={optionIndex.toString()} 
                    id={`q${questionIndex}-${optionIndex}`}
                    className="border-form-primary data-[state=checked]:bg-form-primary"
                  />
                  <Label 
                    htmlFor={`q${questionIndex}-${optionIndex}`}
                    className="text-base cursor-pointer flex-1 py-2"
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + optionIndex)}.
                    </span>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </Card>
        ))}
      </div>
    </div>
  );
};