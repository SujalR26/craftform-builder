import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus } from "lucide-react";

interface ComprehensionQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface ComprehensionData {
  passage: string;
  questions: ComprehensionQuestion[];
}

interface ComprehensionBuilderProps {
  data: ComprehensionData;
  onChange: (data: ComprehensionData) => void;
}

export const ComprehensionBuilder = ({ data, onChange }: ComprehensionBuilderProps) => {
  const updatePassage = (passage: string) => {
    onChange({ ...data, passage });
  };

  const addQuestion = () => {
    onChange({
      ...data,
      questions: [...data.questions, {
        question: '',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct: 0
      }]
    });
  };

  const removeQuestion = (index: number) => {
    const newQuestions = data.questions.filter((_, i) => i !== index);
    onChange({
      ...data,
      questions: newQuestions
    });
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const newQuestions = [...data.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    onChange({
      ...data,
      questions: newQuestions
    });
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...data.questions];
    const newOptions = [...newQuestions[questionIndex].options];
    newOptions[optionIndex] = value;
    newQuestions[questionIndex] = { ...newQuestions[questionIndex], options: newOptions };
    onChange({
      ...data,
      questions: newQuestions
    });
  };

  return (
    <div className="space-y-6">
      {/* Passage */}
      <div>
        <Label className="text-base font-semibold">Reading Passage</Label>
        <Textarea
          value={data.passage}
          onChange={(e) => updatePassage(e.target.value)}
          placeholder="Enter the reading passage here..."
          className="mt-2"
          rows={8}
        />
      </div>

      {/* Questions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Label className="text-base font-semibold">Comprehension Questions</Label>
          <Button onClick={addQuestion} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Add Question
          </Button>
        </div>

        <div className="space-y-6">
          {data.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-4">
                <Label className="font-medium">Question {questionIndex + 1}</Label>
                <Button
                  onClick={() => removeQuestion(questionIndex)}
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <Input
                  value={question.question}
                  onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                  placeholder="Enter your question..."
                />

                <div className="space-y-2">
                  <Label className="text-sm">Answer Options</Label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground min-w-[20px]">
                        {String.fromCharCode(65 + optionIndex)}:
                      </span>
                      <Input
                        value={option}
                        onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <Label className="text-sm">Correct Answer</Label>
                  <Select
                    value={question.correct.toString()}
                    onValueChange={(value) => updateQuestion(questionIndex, 'correct', parseInt(value))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      {question.options.map((_, optionIndex) => (
                        <SelectItem key={optionIndex} value={optionIndex.toString()}>
                          Option {String.fromCharCode(65 + optionIndex)}: {question.options[optionIndex]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};