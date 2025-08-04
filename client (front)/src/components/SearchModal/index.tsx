import { useEffect, useState } from 'react';
import {
  Container,
  SearchInput,
  Suggestions,
  Tag,
  Actions,
  EmptyState
} from './style';
import { getMateriais } from 'api/pesq';

interface Material {
  id: number;
  name: string;
}

interface SearchModalProps {
  onSearch: (materiais: number[]) => void;
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function SearchModal({ onSearch, selected, setSelected }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [materiais, setMateriais] = useState<Material[]>([]);

  const isExpanded = isFocused || selected.length > 0;

  const handleSelect = (item: Material) => {
    if (!selected.includes(item.id)) {
      setSelected([...selected, item.id]);
      setQuery('');
    }
  };

  const handleRemove = (id: number) => {
    setSelected(selected.filter(i => i !== id));
  };

  const filteredItems = materiais.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) &&
    !selected.includes(item.id)
  );

  const fetchMateriais = async () => {
    try {
      const response = await getMateriais();
      setMateriais(response);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    fetchMateriais();
  }, []);

  return (
    <>
      {materiais && (
        <Container isExpanded={isExpanded}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <SearchInput>
              <input
                type="text"
                placeholder="Pesquise por um Item"
                value={query}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                onChange={e => setQuery(e.target.value)}
              />
              {query && (
                <button onClick={() => setQuery('')}>✖</button>
              )}
            </SearchInput>

            {isExpanded && (
              <>
                {selected.length > 0 && (
                  <div>
                    <h4>Itens Selecionados</h4>
                    <Suggestions>
                      {selected.map(id => {
                        const item = materiais.find(m => m.id === id);
                        if (!item) return null;
                        return (
                          <Tag key={id} selected onClick={() => handleRemove(id)}>
                            ✖ {item.name}
                          </Tag>
                        );
                      })}
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
                          <Tag key={item.id} onClick={() => handleSelect(item)}>
                            {item.name}
                          </Tag>
                        ))}
                      </Suggestions>
                    </>
                  )}
                </div>

                <Actions>
                  <button
                    className="back"
                    onClick={() => {
                      setQuery('');
                      setSelected([]);
                      setIsFocused(false);
                    }}
                  >
                    Voltar
                  </button>

                  <button
                    className="filter"
                    onClick={() => {
                      if (selected?.length) {
                        onSearch(selected)
                      }
                      setIsFocused(false);
                    }}
                  >
                    Filtrar
                  </button>
                </Actions>
              </>
            )}
          </div>
        </Container>
      )}
    </>
  );
}
