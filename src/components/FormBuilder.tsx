import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormData, Question } from "@/pages/Index";
import { QuestionBuilder } from "./QuestionBuilder";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, GripVertical, Settings, Image } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface FormBuilderProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const FormBuilder = ({ formData, setFormData }: FormBuilderProps) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const handleFormInfoChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const addQuestion = (type: 'categorize' | 'cloze' | 'comprehension') => {
    const newQuestion: Question = {
      id: `q${Date.now()}`,
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Question`,
      data: getDefaultQuestionData(type)
    };
    
    setFormData({
      ...formData,
      questions: [...formData.questions, newQuestion]
    });
  };

  const getDefaultQuestionData = (type: string) => {
    switch (type) {
      case 'categorize':
        return {
          categories: ['Category 1', 'Category 2'],
          items: ['Item 1', 'Item 2', 'Item 3']
        };
      case 'cloze':
        return {
          text: 'This is a sample text with [blank] spaces that need to be [filled].',
          answers: ['missing', 'completed']
        };
      case 'comprehension':
        return {
          passage: 'Read the following passage and answer the questions below.',
          questions: [
            { question: 'What is the main idea?', options: ['A', 'B', 'C', 'D'], correct: 0 }
          ]
        };
      default:
        return {};
    }
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    setFormData({
      ...formData,
      questions: formData.questions.map(q => 
        q.id === questionId ? { ...q, ...updates } : q
      )
    });
  };

  const deleteQuestion = (questionId: string) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter(q => q.id !== questionId)
    });
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(formData.questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormData({
      ...formData,
      questions: items
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Form Settings */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-form-primary" />
              Form Settings
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Image className="w-4 h-4 mr-2" />
                  Header Image
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Header Image</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Label>Image URL</Label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={formData.headerImage || ''}
                    onChange={(e) => handleFormInfoChange('headerImage', e.target.value)}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Form Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleFormInfoChange('title', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleFormInfoChange('description', e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Question Types */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle>Add Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => addQuestion('categorize')}
              variant="outline"
              className="h-24 flex-col bg-gradient-primary text-white border-0 hover:opacity-90"
            >
              <div className="text-lg font-semibold">Categorize</div>
              <div className="text-sm opacity-90">Drag & drop items into categories</div>
            </Button>
            <Button
              onClick={() => addQuestion('cloze')}
              variant="outline"
              className="h-24 flex-col bg-gradient-secondary text-white border-0 hover:opacity-90"
            >
              <div className="text-lg font-semibold">Cloze</div>
              <div className="text-sm opacity-90">Fill in the blanks</div>
            </Button>
            <Button
              onClick={() => addQuestion('comprehension')}
              variant="outline"
              className="h-24 flex-col bg-form-accent text-form-primary border-0 hover:opacity-90"
            >
              <div className="text-lg font-semibold">Comprehension</div>
              <div className="text-sm opacity-90">Reading comprehension with MCQ</div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {formData.questions.map((question, index) => (
                <Draggable key={question.id} draggableId={question.id} index={index}>
                  {(provided, snapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`bg-white border-0 shadow-medium transition-all duration-200 ${
                        snapshot.isDragging ? 'shadow-large rotate-2' : ''
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                            <GripVertical className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                question.type === 'categorize' ? 'bg-gradient-primary text-white' :
                                question.type === 'cloze' ? 'bg-gradient-secondary text-white' :
                                'bg-form-accent text-form-primary'
                              }`}>
                                {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
                              </span>
                              <span className="text-sm text-muted-foreground">Question {index + 1}</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedQuestion(selectedQuestion === question.id ? null : question.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteQuestion(question.id)}
                            className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                          >
                            Delete
                          </Button>
                        </div>
                      </CardHeader>
                      {selectedQuestion === question.id && (
                        <CardContent>
                          <QuestionBuilder
                            question={question}
                            onUpdate={(updates) => updateQuestion(question.id, updates)}
                          />
                        </CardContent>
                      )}
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {formData.questions.length === 0 && (
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="py-12 text-center">
            <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No questions yet</h3>
            <p className="text-muted-foreground mb-4">Add your first question using the buttons above</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};