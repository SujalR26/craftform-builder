import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CategorizeData {
  categories: string[];
  items: string[];
}

interface CategorizeQuestionProps {
  data: CategorizeData;
}

export const CategorizeQuestion = ({ data }: CategorizeQuestionProps) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [categorizedItems, setCategorizedItems] = useState<{ [key: string]: string[] }>({});

  const handleDragStart = (item: string) => {
    setDraggedItem(item);
  };

  const handleDrop = (category: string) => {
    if (draggedItem) {
      setCategorizedItems(prev => ({
        ...prev,
        [category]: [...(prev[category] || []), draggedItem]
      }));
      setDraggedItem(null);
    }
  };

  const removeFromCategory = (category: string, item: string) => {
    setCategorizedItems(prev => ({
      ...prev,
      [category]: prev[category]?.filter(i => i !== item) || []
    }));
  };

  const uncategorizedItems = data.items.filter(item => 
    !Object.values(categorizedItems).flat().includes(item)
  );

  return (
    <div className="space-y-6">
      {/* Items to categorize */}
      <div>
        <h4 className="font-semibold mb-3">Items to categorize:</h4>
        <div className="flex flex-wrap gap-2">
          {uncategorizedItems.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              className="cursor-grab bg-form-accent/20 border-form-accent text-form-primary hover:bg-form-accent/30"
              draggable
              onDragStart={() => handleDragStart(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.categories.map((category, index) => (
          <Card
            key={index}
            className="p-4 min-h-[120px] border-2 border-dashed border-form-primary/30 bg-gradient-card"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(category)}
          >
            <h5 className="font-semibold mb-3 text-form-primary">{category}</h5>
            <div className="space-y-2">
              {categorizedItems[category]?.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between bg-form-primary/10 px-3 py-2 rounded"
                >
                  <span className="text-sm">{item}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFromCategory(category, item)}
                    className="h-auto p-1 text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};