import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Plus, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ClozeData {
  text: string;
  answers: string[];
}

interface ClozeBuilderProps {
  data: ClozeData;
  onChange: (data: ClozeData) => void;
}

export const ClozeBuilder = ({ data, onChange }: ClozeBuilderProps) => {
  const updateText = (text: string) => {
    onChange({ ...data, text });
  };

  const addAnswer = () => {
    onChange({
      ...data,
      answers: [...data.answers, '']
    });
  };

  const removeAnswer = (index: number) => {
    const newAnswers = data.answers.filter((_, i) => i !== index);
    onChange({
      ...data,
      answers: newAnswers
    });
  };

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...data.answers];
    newAnswers[index] = value;
    onChange({
      ...data,
      answers: newAnswers
    });
  };

  // Count blanks in text
  const blankCount = (data.text.match(/\[blank\]/g) || []).length;

  return (
    <div className="space-y-6">
      {/* Text with blanks */}
      <div>
        <Label className="text-base font-semibold">Text (use [blank] for fill-in areas)</Label>
        <Textarea
          value={data.text}
          onChange={(e) => updateText(e.target.value)}
          placeholder="Enter your text here. Use [blank] where you want students to fill in answers."
          className="mt-2"
          rows={6}
        />
        <Alert className="mt-2">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Use [blank] in your text to create fill-in areas. Found {blankCount} blank(s) in your text.
          </AlertDescription>
        </Alert>
      </div>

      {/* Answers */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label className="text-base font-semibold">Correct Answers</Label>
          <Button onClick={addAnswer} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Add Answer
          </Button>
        </div>
        <div className="space-y-2">
          {data.answers.map((answer, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2">
                <span className="text-sm text-muted-foreground min-w-[60px]">
                  Blank {index + 1}:
                </span>
                <Input
                  value={answer}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                  placeholder="Correct answer"
                />
              </div>
              <Button
                onClick={() => removeAnswer(index)}
                size="sm"
                variant="outline"
                disabled={data.answers.length <= 1}
                className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        {blankCount !== data.answers.length && (
          <Alert className="mt-2">
            <Info className="h-4 w-4" />
            <AlertDescription>
              You have {blankCount} blank(s) in your text but {data.answers.length} answer(s). 
              Make sure they match for proper validation.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};