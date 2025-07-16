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

interface Props {
selected: string[];
setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const allItems = [
    "Garrafa PET - 250ml", "Garrafa PET - 500ml", "Garrafa PET - 750ml", "Garrafa PET - 1L",
    "Garrafa PET - 2L", "Garrafa PET", "Folha de Papel", "Jornal", "Caixa de Papelão",
    "Embalagem de Produto de Limpeza", "Pote de Plástico", "Sacola Plástica", "Revista",
    "Frasco de Cosmético", "Tampa de Garrafa", "Tampa de Pote", "Garrafa de Vidro",
    "Lata de Alumínio", "Pote de Vidro", "Papel Alumínio", "Pilha", "Cabos", "Pneu",
    "Roupas", "Tecidos", "Lâmpada", "Cola Branca", "Terra"
];

const MaterialSelector: React.FC<Props> = ({ selected, setSelected }) => {
const [query, setQuery] = useState('');
const [isFocused, setIsFocused] = useState(false);
const inputRef = useRef<HTMLInputElement>(null);

const filteredItems = allItems.filter(item =>
    item.toLowerCase().includes(query.toLowerCase()) && !selected.includes(item)
);

const handleSelect = (item: string) => {
    if (!selected.includes(item)) {
    setSelected([...selected, item]);
    setQuery('');
    }
};

const handleRemove = (item: string) => {
    setSelected(selected.filter(i => i !== item));
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const foundItem = allItems.find(item =>
        item.toLowerCase() === query.toLowerCase()
    );
    if (foundItem && !selected.includes(foundItem)) {
        handleSelect(foundItem);
    }}
};

return (
<Container>
    <Wrapper className={selected.length > 0 || isFocused || query.length > 0 ? 'active' : ''}>
        <Label>
        Materiais<RequiredMark>*</RequiredMark>
        </Label>
        <InputField onClick={() => inputRef.current?.focus()}>
        {selected.map((item, index) => (
            <Tag key={index} selected onClick={() => handleRemove(item)}>
            ✖ {item}
            </Tag>
        ))}
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

        {isFocused && filteredItems.length > 0 && (
        <Suggestions>
            {filteredItems.map((item, index) => (
            <div key={index} onMouseDown={() => handleSelect(item)}>
                {item}
            </div>
            ))}
        </Suggestions>
        )}
    </Wrapper>
</Container>
);
};

export default MaterialSelector;