
import WordCard from "./WordCard";

interface GameBoardProps {
  words: string[];
  selectedIndices: number[];
  onSelectionChange: (indices: number[]) => void;
  disabled?: boolean;
  maxSelections?: number;
}

export default function GameBoard({ 
  words, 
  selectedIndices,
  onSelectionChange,
  disabled = false,
  maxSelections = 4

 }: GameBoardProps) {

  const handleWordClick = (clickedIndex: number) => {
    if (disabled) return;

    const isSelected = selectedIndices.includes(clickedIndex);

    if (isSelected) {
      // Deselect
      onSelectionChange(selectedIndices.filter(i => i !== clickedIndex));
    } else if (selectedIndices.length < maxSelections) {
      // Select
      onSelectionChange([...selectedIndices, clickedIndex]);
    }
  };
  return (
    <div className="grid grid-cols-4 gap-1.5 w-full">
      {words.map((word, index) => (
        <WordCard
        key={index}
        word={word}
        isSelected={selectedIndices.includes(index)}
        isDisabled={disabled}
        onClick={() => handleWordClick(index)}
        />
      ))}
    </div>
  );
}
