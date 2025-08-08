import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";

interface CategorizeData {
  categories: string[];
  items: string[];
}

interface CategorizeBuilderProps {
  data: CategorizeData;
  onChange: (data: CategorizeData) => void;
}

export const CategorizeBuilder = ({ data, onChange }: CategorizeBuilderProps) => {
  const addCategory = () => {
    onChange({
      ...data,
      categories: [...data.categories, `Category ${data.categories.length + 1}`]
    });
  };

  const removeCategory = (index: number) => {
    const newCategories = data.categories.filter((_, i) => i !== index);
    onChange({
      ...data,
      categories: newCategories
    });
  };

  const updateCategory = (index: number, value: string) => {
    const newCategories = [...data.categories];
    newCategories[index] = value;
    onChange({
      ...data,
      categories: newCategories
    });
  };

  const addItem = () => {
    onChange({
      ...data,
      items: [...data.items, `Item ${data.items.length + 1}`]
    });
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    onChange({
      ...data,
      items: newItems
    });
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...data.items];
    newItems[index] = value;
    onChange({
      ...data,
      items: newItems
    });
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label className="text-base font-semibold">Categories</Label>
          <Button onClick={addCategory} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Add Category
          </Button>
        </div>
        <div className="space-y-2">
          {data.categories.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={category}
                onChange={(e) => updateCategory(index, e.target.value)}
                placeholder={`Category ${index + 1}`}
              />
              <Button
                onClick={() => removeCategory(index)}
                size="sm"
                variant="outline"
                disabled={data.categories.length <= 1}
                className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label className="text-base font-semibold">Items to Categorize</Label>
          <Button onClick={addItem} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Add Item
          </Button>
        </div>
        <div className="space-y-2">
          {data.items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                placeholder={`Item ${index + 1}`}
              />
              <Button
                onClick={() => removeItem(index)}
                size="sm"
                variant="outline"
                disabled={data.items.length <= 1}
                className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};