import React, { useState, useRef } from 'react';
import {
  Container,
  Wrapper,
  Label,
  InputField,
  RequiredMark,
  Tag,
  Suggestions
} from './style';

interface Material {
  id: number;
  name: string;
}

interface Props {
  selected: number[]; // Agora são os IDs dos materiais
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  materiais: Material[];
}

const MaterialSelector: React.FC<Props> = ({ selected, setSelected, materiais }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (item: Material) => {
    if (!selected.includes(item.id)) {
      setSelected([...selected, item.id]);
      setQuery('');
    }
  };

  const handleRemove = (id: number) => {
    setSelected(selected.filter(i => i !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const foundItem = materiais.find(item =>
        item.name.toLowerCase() === query.toLowerCase()
      );
      if (foundItem && !selected.includes(foundItem.id)) {
        handleSelect(foundItem);
      }
    }
  };

  const filteredSuggestions = materiais?.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) &&
    !selected.includes(item.id)
  );

  return (
    <Container>
      <Wrapper className={selected.length > 0 || isFocused || query.length > 0 ? 'active' : ''}>
        <Label>
          Materiais<RequiredMark>*</RequiredMark>
        </Label>
        <InputField onClick={() => inputRef.current?.focus()}>
          {selected.map((id) => {
            const material = materiais.find((m) => m.id === id);
            return (
              <Tag key={id} selected onClick={() => handleRemove(id)}>
                ✖ {material?.name}
              </Tag>
            );
          })}
          <input
            ref={inputRef}
            type="text"
            placeholder=" "
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
          />
        </InputField>

        {isFocused && filteredSuggestions?.length > 0 && (
          <Suggestions>
            {filteredSuggestions.map((item) => (
              <div key={item.id} onMouseDown={() => handleSelect(item)}>
                {item.name}
              </div>
            ))}
          </Suggestions>
        )}
      </Wrapper>
    </Container>
  );
};

export default MaterialSelector;
