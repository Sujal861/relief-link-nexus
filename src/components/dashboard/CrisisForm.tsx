
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CrisisFormData {
  name: string;
  location: string;
  type: string;
  description: string;
  dangerLevel: string;
  cause: string;
  affectedPopulation: number;
}

interface CrisisFormProps {
  onSubmit: (data: CrisisFormData) => void;
}

export const CrisisForm = ({ onSubmit }: CrisisFormProps) => {
  const [formData, setFormData] = useState<CrisisFormData>({
    name: "",
    location: "",
    type: "",
    description: "",
    dangerLevel: "medium",
    cause: "",
    affectedPopulation: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Crisis Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="E.g., Hurricane Florence"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="E.g., Coastal Carolina"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Crisis Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleSelectChange("type", value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select crisis type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Natural Disaster">Natural Disaster</SelectItem>
              <SelectItem value="Armed Conflict">Armed Conflict</SelectItem>
              <SelectItem value="Public Health">Public Health</SelectItem>
              <SelectItem value="Food Security">Food Security</SelectItem>
              <SelectItem value="Displacement">Displacement</SelectItem>
              <SelectItem value="Infrastructure">Infrastructure</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dangerLevel">Danger Level</Label>
          <Select
            value={formData.dangerLevel}
            onValueChange={(value) => handleSelectChange("dangerLevel", value)}
          >
            <SelectTrigger id="dangerLevel">
              <SelectValue placeholder="Select danger level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cause">Cause</Label>
        <Input
          id="cause"
          name="cause"
          value={formData.cause}
          onChange={handleChange}
          placeholder="E.g., Heavy rainfall, tectonic activity"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="affectedPopulation">Affected Population (estimated)</Label>
        <Input
          id="affectedPopulation"
          name="affectedPopulation"
          value={formData.affectedPopulation.toString()}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setFormData(prev => ({ 
              ...prev, 
              affectedPopulation: isNaN(value) ? 0 : value 
            }));
          }}
          type="number"
          min="0"
          placeholder="E.g., 5000"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide more details about the crisis..."
          rows={3}
          required
        />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">Submit Report</Button>
      </div>
    </form>
  );
};
