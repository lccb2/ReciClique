import { useState } from 'react';
import {
  Container, SearchInput, Suggestions, Tag, Actions, EmptyState
} from './style';

const allItems = [
  "Garrafa PET - 250ml", "Garrafa PET - 500ml", "Garrafa PET - 750ml", "Garrafa PET - 1L",
  "Garrafa PET - 2L", "Garrafa PET", "Folha de Papel", "Jornal", "Caixa de Papelão",
  "Embalagem de Produto de Limpeza", "Pote de Plástico", "Sacola Plástica", "Revista",
  "Frasco de Cosmético", "Tampa de Garrafa", "Tampa de Pote", "Garrafa de Vidro",
  "Lata de Alumínio", "Pote de Vidro", "Papel Alumínio", "Pilha", "Cabos", "Pneu",
  "Roupas", "Tecidos", "Lâmpada", "Cola Branca", "Terra"
];

export default function SearchModal() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (item: string) => {
    if (!selected.includes(item)) {
      setSelected([...selected, item]);
    }
  };

  const handleRemove = (item: string) => {
    setSelected(selected.filter(i => i !== item));
  };

  const filteredItems = allItems.filter(item =>
    item.toLowerCase().includes(query.toLowerCase()) &&
    !selected.includes(item)
  );

  return (
    <Container>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <SearchInput>
          <input
            type="text"
            placeholder="Pesquise por um Item"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery('')}>✖</button>
          )}
        </SearchInput>

        {selected.length > 0 && (
          <div>
            <h4>Itens Selecionados</h4>
            <Suggestions>
              {selected.map(item => (
                <Tag key={item} selected onClick={() => handleRemove(item)}>
                  ✖ {item}
                </Tag>
              ))}
            </Suggestions>
          </div>
        )}

        <div style={{ flex: 1 }}>
          {query && filteredItems.length === 0 && selected.length === 0 ? (
            <EmptyState>
              Não encontramos nenhum resultado para a sua busca.
              <br />
              Que tal verificar a ortografia ou tentar com outras palavras?
            </EmptyState>
          ) : (
            <>
              {!query && <h4>Sugestão de Itens</h4>}
              <Suggestions>
                {filteredItems.map(item => (
                  <Tag key={item} onClick={() => handleSelect(item)}>
                    {item}
                  </Tag>
                ))}
              </Suggestions>
            </>
          )}
        </div>
      </div>

      <Actions>
        <button className="back">Voltar</button>
        <button className="filter">Filtrar</button>
      </Actions>
    </Container>
  );
}
