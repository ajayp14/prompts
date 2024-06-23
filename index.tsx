import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const scenarios = [
  {
    task: "Generate a creative story idea",
    goodPrompt: "Write a short story premise that combines two unlikely genres",
    badPrompt: "Give me a story idea",
    explanation: "The good prompt specifies the desired output (a premise) and adds a creative constraint (combining genres) to encourage more interesting results."
  },
  {
    task: "Get factual information about a topic",
    goodPrompt: "Provide a brief overview of photosynthesis, including its main steps and importance",
    badPrompt: "Tell me about photosynthesis",
    explanation: "The good prompt specifies the desired level of detail (brief overview) and aspects to focus on (main steps and importance)."
  },
  {
    task: "Debug a piece of code",
    goodPrompt: "Review this Python function for common errors and suggest improvements: [insert code here]",
    badPrompt: "Fix my code",
    explanation: "The good prompt specifies the language, asks for a review rather than just fixes, and prompts for suggestions to improve the code."
  }
];

export default function PromptEngineeringGame() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [userPrompt, setUserPrompt] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSubmit = () => {
    const scenario = scenarios[currentScenario];
    if (userPrompt.toLowerCase().includes(scenario.goodPrompt.toLowerCase())) {
      setFeedback("Great job! Your prompt is well-crafted.");
    } else {
      setFeedback("Your prompt could use some improvement. Try to be more specific.");
    }
    setShowAnswer(true);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setUserPrompt('');
      setFeedback('');
      setShowAnswer(false);
    } else {
      setFeedback("Congratulations! You've completed all scenarios.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Prompt Engineering Game</CardTitle>
        <CardDescription>Practice crafting effective prompts for AI</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert>
            <AlertTitle>Task</AlertTitle>
            <AlertDescription>{scenarios[currentScenario].task}</AlertDescription>
          </Alert>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Enter your prompt here..."
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
            />
            <Button onClick={handleSubmit}>
              <Send className="h-4 w-4 mr-2" />
              Submit
            </Button>
          </div>
          {feedback && (
            <Alert variant={feedback.includes("Great job") ? "default" : "destructive"}>
              <AlertDescription>{feedback}</AlertDescription>
            </Alert>
          )}
          {showAnswer && (
            <div className="space-y-2">
              <Alert variant="default">
                <AlertTitle>A good prompt could be:</AlertTitle>
                <AlertDescription>{scenarios[currentScenario].goodPrompt}</AlertDescription>
              </Alert>
              <Alert variant="default">
                <AlertTitle>Explanation:</AlertTitle>
                <AlertDescription>{scenarios[currentScenario].explanation}</AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={nextScenario} className="w-full">
          Next Scenario
        </Button>
      </CardFooter>
    </Card>
  );
}
